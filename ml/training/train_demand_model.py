from pathlib import Path

import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATA_PATH = (
    PROJECT_ROOT
    / "ml"
    / "data"
    / "raw"
    / "decisioai_synthetic_sales_data.csv"
)

MODEL_DIR = PROJECT_ROOT / "ml" / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------
# Load dataset
# ---------------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(DATA_PATH)

print(f"Dataset shape: {df.shape}")


# ---------------------------------------------------------
# Feature engineering
# ---------------------------------------------------------

# Convert YYYY-MM into useful numerical time features.
df["Month"] = pd.to_datetime(df["Month"])

df["Year"] = df["Month"].dt.year
df["MonthNumber"] = df["Month"].dt.month

# Drop original date representation.
df = df.drop(columns=["Month"])


# ---------------------------------------------------------
# Define target and features
# ---------------------------------------------------------

TARGET = "Quantity"

X = df.drop(columns=[TARGET])
y = df[TARGET]


# ---------------------------------------------------------
# Feature types
# ---------------------------------------------------------

categorical_features = [
    "Product",
    "Category",
    "Region",
]

numeric_features = [
    "Cost",
    "Price",
    "Year",
    "MonthNumber",
]


# ---------------------------------------------------------
# Preprocessing
# ---------------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features,
        ),
        (
            "numeric",
            "passthrough",
            numeric_features,
        ),
    ]
)


# ---------------------------------------------------------
# Train/test split
# ---------------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
)


print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")


# ---------------------------------------------------------
# Models
# ---------------------------------------------------------

models = {
    "linear_regression": LinearRegression(),

    "random_forest": RandomForestRegressor(
        n_estimators=300,
        random_state=42,
        n_jobs=-1,
    ),
}


results = {}


# ---------------------------------------------------------
# Train and evaluate
# ---------------------------------------------------------

for model_name, model in models.items():

    print()
    print(f"Training {model_name}...")

    pipeline = Pipeline(
        steps=[
            (
                "preprocessor",
                preprocessor,
            ),
            (
                "model",
                model,
            ),
        ]
    )

    pipeline.fit(
        X_train,
        y_train,
    )

    predictions = pipeline.predict(X_test)

    mae = mean_absolute_error(
        y_test,
        predictions,
    )

    rmse = mean_squared_error(
        y_test,
        predictions,
    ) ** 0.5

    r2 = r2_score(
        y_test,
        predictions,
    )

    results[model_name] = {
        "pipeline": pipeline,
        "mae": mae,
        "rmse": rmse,
        "r2": r2,
    }

    print(f"MAE : {mae:.3f}")
    print(f"RMSE: {rmse:.3f}")
    print(f"R²  : {r2:.3f}")


# ---------------------------------------------------------
# Select best model
# ---------------------------------------------------------

best_model_name = min(
    results,
    key=lambda name: results[name]["mae"],
)

best_model = results[best_model_name]["pipeline"]

model_path = (
    MODEL_DIR
    / "demand_model.joblib"
)

joblib.dump(
    best_model,
    model_path,
)


# ---------------------------------------------------------
# Save evaluation results
# ---------------------------------------------------------

results_path = (
    MODEL_DIR
    / "evaluation_results.txt"
)

with open(results_path, "w") as file:

    file.write(
        f"Best model: {best_model_name}\n\n"
    )

    for model_name, result in results.items():

        file.write(
            f"{model_name}\n"
        )

        file.write(
            f"MAE: {result['mae']:.4f}\n"
        )

        file.write(
            f"RMSE: {result['rmse']:.4f}\n"
        )

        file.write(
            f"R2: {result['r2']:.4f}\n\n"
        )


print()
print("=" * 50)
print(f"Best model: {best_model_name}")
print(f"Saved model: {model_path}")
print(f"Saved metrics: {results_path}")
print("=" * 50)
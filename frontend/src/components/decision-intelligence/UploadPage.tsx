import { FormEvent, useState } from "react";
import { analyzeDecision } from "../../services/decisionApi";
import type { DecisionResponse } from "../../services/decisionApi";

function AIAdvisor() {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [constraints, setConstraints] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<DecisionResponse | null>(null);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await analyzeDecision({
        question,
        context,
        constraints: constraints
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      });

      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze decision.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          AI Decision Analysis
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="font-medium">
              Decision Question
            </label>

            <input
              className="mt-2 w-full rounded-xl border p-3"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Should I build my startup?"
              required
            />
          </div>

          <div>
            <label className="font-medium">
              Context
            </label>

            <textarea
              rows={4}
              className="mt-2 w-full rounded-xl border p-3"
              value={context}
              onChange={(e) =>
                setContext(e.target.value)
              }
              placeholder="Describe your situation..."
            />
          </div>

          <div>
            <label className="font-medium">
              Constraints
            </label>

            <input
              className="mt-2 w-full rounded-xl border p-3"
              value={constraints}
              onChange={(e) =>
                setConstraints(e.target.value)
              }
              placeholder="Low budget, Time, Team of 2"
            />

            <p className="mt-2 text-sm text-slate-500">
              Separate constraints using commas.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Decision"}
          </button>
        </form>
      </div>

      {result && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              Recommendation
            </h2>

            <p className="mt-2">
              {result.recommendation}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Confidence
            </h2>

            <p>{result.confidence}%</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Pros
            </h2>

            <ul className="list-disc pl-6">
              {result.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Cons
            </h2>

            <ul className="list-disc pl-6">
              {result.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Risks
            </h2>

            <ul className="list-disc pl-6">
              {result.risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAdvisor;
import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Database,
  Hash,
  Type,
  RefreshCw,
  Table as TableIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadDataset, type UploadResponse } from "../../services/uploadApi";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format bytes into readable size string
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Validate and set CSV file
  const handleFileSelect = (file: File) => {
    setError(null);
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files (.csv) are supported. Please select a valid CSV dataset.");
      setSelectedFile(null);
      return;
    }
    if (file.size === 0) {
      setError("The selected CSV file appears to be empty.");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setUploadResult(null);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit file for profiling
  const handleAnalyse = useCallback(async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadDataset(selectedFile);
      setUploadResult(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while uploading and analysing the dataset.");
      }
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, isUploading]);

  const handleReset = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8 select-none font-sans text-[#F5F5F5]">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-4xl">
          Upload your dataset
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#9A9A9A]">
          Upload a CSV dataset for automated schema profiling, data health verification, column classification, and AI decision readiness.
        </p>
      </div>

      {/* Main Upload Control Panel */}
      {!uploadResult ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-[#252529] bg-[#111214] p-6 md:p-8 shadow-xl"
        >
          {/* Hidden HTML File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".csv"
            className="hidden"
          />

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Upload CSV file"
            className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E63946]/50 ${
              isDragOver
                ? "border-[#E63946] bg-[#2A1215]/40"
                : selectedFile
                ? "border-[#E63946]/50 bg-[#17181B]"
                : "border-[#252529] bg-[#17181B]/40 hover:border-slate-600 hover:bg-[#17181B]"
            }`}
          >
            {!selectedFile ? (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2A1215] text-[#FF3B30] border border-[#E63946]/30 transition-transform group-hover:scale-105">
                  <Upload size={28} />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F5F5]">
                  Drag & drop your CSV file here, or browse
                </h3>
                <p className="mt-1 text-xs text-[#9A9A9A]">
                  Supported file format: <span className="font-semibold text-slate-300">CSV (.csv)</span>
                </p>
              </>
            ) : (
              <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-[#252529] bg-[#111214] p-4 shadow-sm">
                <div className="flex items-center gap-3 truncate">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2A1215] text-[#FF3B30]">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div className="truncate text-left">
                    <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-[#9A9A9A]">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-[#252529] hover:text-[#F5F5F5]"
                  title="Remove file"
                  aria-label="Remove selected file"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Error Alert Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-3 rounded-xl border border-red-900/60 bg-[#2A1215] p-4 text-xs text-red-200"
              >
                <AlertCircle size={18} className="shrink-0 text-[#FF3B30]" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Trigger Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAnalyse}
              disabled={!selectedFile || isUploading}
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#E63946] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-950/40 transition-all duration-200 hover:bg-[#FF3B30] hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Analysing dataset...</span>
                </>
              ) : (
                <>
                  <Database size={18} />
                  <span>Analyse dataset</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        /* Results Overview Panel */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Top Status & Re-upload Trigger */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#252529] bg-[#111214] p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A1215] text-[#FF3B30] border border-[#E63946]/30">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#F5F5F5]">
                  Dataset Profile Complete
                </h2>
                <p className="text-xs text-[#9A9A9A]">
                  File: <span className="font-semibold text-slate-200">{uploadResult.filename}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-[#252529] bg-[#17181B] px-4 py-2.5 text-xs font-semibold text-[#F5F5F5] transition hover:bg-[#252529] hover:border-slate-600"
            >
              <RefreshCw size={14} />
              <span>Upload another dataset</span>
            </button>
          </div>

          {/* Key Metrics Overview Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
              <span className="text-xs font-medium text-[#9A9A9A]">Total Rows</span>
              <p className="mt-2 text-2xl font-black text-[#F5F5F5]">
                {uploadResult.rows.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
              <span className="text-xs font-medium text-[#9A9A9A]">Total Columns</span>
              <p className="mt-2 text-2xl font-black text-[#F5F5F5]">
                {uploadResult.columns}
              </p>
            </div>

            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
              <span className="text-xs font-medium text-[#9A9A9A]">Completeness Score</span>
              <p className="mt-2 text-2xl font-black text-[#FF3B30]">
                {uploadResult.quality.completeness.toFixed(1)}%
              </p>
            </div>

            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
              <span className="text-xs font-medium text-[#9A9A9A]">Duplicate Rows</span>
              <p className="mt-2 text-2xl font-black text-[#F5F5F5]">
                {uploadResult.quality.duplicate_rows}
              </p>
            </div>
          </div>

          {/* Column Classification Breakdown */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Numeric Columns */}
            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Hash size={16} />
                <span>Numeric Columns ({uploadResult.numeric_columns.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadResult.numeric_columns.length > 0 ? (
                  uploadResult.numeric_columns.map((col) => (
                    <span
                      key={col}
                      className="rounded-lg border border-[#252529] bg-[#17181B] px-3 py-1.5 text-xs font-mono font-medium text-slate-200"
                    >
                      {col}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#9A9A9A]">No numeric columns identified.</span>
                )}
              </div>
            </div>

            {/* Categorical Columns */}
            <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <Type size={16} />
                <span>Categorical Columns ({uploadResult.categorical_columns.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadResult.categorical_columns.length > 0 ? (
                  uploadResult.categorical_columns.map((col) => (
                    <span
                      key={col}
                      className="rounded-lg border border-[#252529] bg-[#17181B] px-3 py-1.5 text-xs font-mono font-medium text-slate-200"
                    >
                      {col}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#9A9A9A]">No categorical columns identified.</span>
                )}
              </div>
            </div>
          </div>

          {/* Missing Values Breakdown */}
          <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F5F5F5]">Missing Values by Column</h3>
            {Object.keys(uploadResult.missing_values).length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(uploadResult.missing_values).map(([col, missingCount]) => (
                  <div
                    key={col}
                    className="flex items-center justify-between rounded-xl border border-[#252529] bg-[#17181B] px-4 py-2.5 text-xs"
                  >
                    <span className="truncate font-mono font-medium text-slate-300">{col}</span>
                    <span className={`font-bold ${missingCount > 0 ? "text-[#FF3B30]" : "text-emerald-400"}`}>
                      {missingCount} missing
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#9A9A9A]">No missing values detected across dataset columns.</p>
            )}
          </div>

          {/* Dataset Preview Table */}
          <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F5F5F5]">
                <TableIcon size={18} className="text-[#FF3B30]" />
                <span>Dataset Preview (First 10 Rows)</span>
              </div>
              <span className="text-xs text-[#9A9A9A]">
                Showing {Math.min(10, uploadResult.preview.length)} of {uploadResult.rows.toLocaleString()} rows
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#252529] bg-[#080808]">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#252529] bg-[#17181B] text-[#F5F5F5]">
                  <tr>
                    {uploadResult.column_names.map((colHeader) => (
                      <th
                        key={colHeader}
                        className="px-4 py-3 font-mono font-bold tracking-wide whitespace-nowrap"
                      >
                        {colHeader}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252529]/60 text-slate-300">
                  {uploadResult.preview.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-[#17181B]/50 transition-colors">
                      {uploadResult.column_names.map((colHeader) => {
                        const cellVal = row[colHeader];
                        const isNull = cellVal === null || cellVal === undefined || cellVal === "";

                        return (
                          <td key={colHeader} className="px-4 py-2.5 whitespace-nowrap font-mono text-[11px]">
                            {isNull ? (
                              <span className="text-slate-600 italic">null</span>
                            ) : (
                              String(cellVal)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

import type { CalcMode, PositionDirection } from "../types";

interface InputPanelProps {
  mode: CalcMode;
  onModeChange: (mode: CalcMode) => void;
  direction: PositionDirection;
  onDirectionChange: (direction: PositionDirection) => void;
  marginAllocated: number;
  onMarginAllocatedChange: (value: number) => void;
  maxRiskUsd: number;
  onMaxRiskUsdChange: (value: number) => void;
  leverage: number;
  onLeverageChange: (value: number) => void;
  entryPrice: number;
  onEntryPriceChange: (value: number) => void;
  stopLoss: number;
  onStopLossChange: (value: number) => void;
  takeProfit?: number;
  onTakeProfitChange: (value: number | undefined) => void;
}

function parseNumeric(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseOptionalNumeric(value: string): number | undefined {
  if (value.trim() === "") {
    return undefined;
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

interface NumberFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: string) => void;
  step?: number;
  min?: number;
  optional?: boolean;
}

function NumberField({
  label,
  value,
  onChange,
  step,
  min,
  optional = false,
}: NumberFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-widest text-[#ff7a00]">
        {label} {optional ? "(Optional)" : ""}
      </span>
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        step={step}
        min={min}
        className="w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 font-mono text-sm text-[#ffffff] outline-none transition focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/30"
      />
    </label>
  );
}

export function InputPanel(props: InputPanelProps) {
  const {
    mode,
    onModeChange,
    direction,
    onDirectionChange,
    marginAllocated,
    onMarginAllocatedChange,
    maxRiskUsd,
    onMaxRiskUsdChange,
    leverage,
    onLeverageChange,
    entryPrice,
    onEntryPriceChange,
    stopLoss,
    onStopLossChange,
    takeProfit,
    onTakeProfitChange,
  } = props;

  return (
    <section className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4 shadow-[0_0_20px_rgba(0,0,0,0.35)] md:p-6">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-[#ffffff]">Input Command Center</h2>
        <p className="mt-1 text-sm text-[#888888]">
          Live calculations update on every keystroke.
        </p>
      </header>

      <div className="mb-6 flex rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-1">
        <button
          type="button"
          onClick={() => onModeChange("CALCULATOR")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "CALCULATOR"
              ? "bg-[#ff7a00] text-[#0a0a0a]"
              : "bg-[#1a1a1a] text-[#888888] hover:text-[#ffffff]"
          }`}
        >
          Standard Calculator
        </button>
        <button
          type="button"
          onClick={() => onModeChange("RISK_SIZING")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "RISK_SIZING"
              ? "bg-[#ff7a00] text-[#0a0a0a]"
              : "bg-[#1a1a1a] text-[#888888] hover:text-[#ffffff]"
          }`}
        >
          Risk-Based Sizing (Pro)
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onDirectionChange("LONG")}
          className={`rounded-xl border px-4 py-4 text-lg font-bold transition ${
            direction === "LONG"
              ? "border-[#ff7a00] bg-[#ff7a00] text-[#0a0a0a]"
              : "border-[#2a2a2a] bg-[#1a1a1a] text-[#888888] hover:border-[#ff7a00]/60"
          }`}
        >
          LONG
        </button>
        <button
          type="button"
          onClick={() => onDirectionChange("SHORT")}
          className={`rounded-xl border px-4 py-4 text-lg font-bold transition ${
            direction === "SHORT"
              ? "border-[#ef4444] bg-[#ef4444] text-white"
              : "border-[#2a2a2a] bg-[#1a1a1a] text-[#888888] hover:border-[#ef4444]/60"
          }`}
        >
          SHORT
        </button>
      </div>

      <div className="space-y-4">
        {mode === "CALCULATOR" ? (
          <NumberField
            label="Margin Allocated ($)"
            value={marginAllocated}
            onChange={(value) => onMarginAllocatedChange(parseNumeric(value))}
            min={0}
            step={0.01}
          />
        ) : (
          <NumberField
            label="Max Risk ($)"
            value={maxRiskUsd}
            onChange={(value) => onMaxRiskUsdChange(parseNumeric(value))}
            min={0}
            step={0.01}
          />
        )}

        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#ff7a00]">
            Leverage
          </span>
          <div className="grid grid-cols-[1fr_110px] gap-3">
            <input
              type="range"
              min={1}
              max={125}
              step={1}
              value={leverage}
              onChange={(event) => onLeverageChange(parseNumeric(event.target.value))}
              className="w-full accent-[#ff7a00]"
            />
            <input
              type="number"
              min={1}
              max={125}
              step={1}
              value={leverage}
              onChange={(event) => onLeverageChange(parseNumeric(event.target.value))}
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 font-mono text-sm text-[#ffffff] outline-none transition focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/30"
            />
          </div>
        </label>

        <NumberField
          label="Entry Price"
          value={entryPrice}
          onChange={(value) => onEntryPriceChange(parseNumeric(value))}
          min={0}
          step={0.0001}
        />
        <NumberField
          label="Stop Loss"
          value={stopLoss}
          onChange={(value) => onStopLossChange(parseNumeric(value))}
          min={0}
          step={0.0001}
        />
        <NumberField
          label="Take Profit"
          value={takeProfit}
          onChange={(value) => onTakeProfitChange(parseOptionalNumeric(value))}
          min={0}
          step={0.0001}
          optional
        />
      </div>
    </section>
  );
}

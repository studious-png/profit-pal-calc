import { AlertTriangle, Skull } from "lucide-react";
import { formatPrice, formatRatio, formatUsd } from "../lib/format";
import type { CalculationResult, PositionDirection } from "../types";

interface OutputMatrixProps {
  result: CalculationResult;
  direction: PositionDirection;
  leverage: number;
  stopLoss: number;
}

function rrColor(riskRewardRatio: number | null): string {
  if (riskRewardRatio === null) {
    return "text-[#888888]";
  }
  if (riskRewardRatio < 1) {
    return "text-[#ef4444]";
  }
  if (riskRewardRatio <= 2) {
    return "text-amber-400";
  }
  return "text-[#ff7a00]";
}

export function OutputMatrix({ result, direction, leverage, stopLoss }: OutputMatrixProps) {
  const shouldWarnLiquidation =
    result.isValid &&
    ((direction === "LONG" && stopLoss <= result.estimatedLiquidationPriceSimple) ||
      (direction === "SHORT" && stopLoss >= result.estimatedLiquidationPriceSimple));

  return (
    <section className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4 shadow-[0_0_20px_rgba(0,0,0,0.35)] md:p-6">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#ffffff]">The Liquidation Matrix</h2>
          <p className="mt-1 text-sm text-[#888888]">
            Risk diagnostics and liquidation proximity.
          </p>
        </div>
        {leverage > 50 ? (
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#ef4444]/60 bg-[#ef4444]/10 px-3 py-2 text-sm font-semibold text-[#ef4444]">
            <Skull size={16} />
            <span>Leverage Over 50x</span>
          </div>
        ) : null}
      </header>

      {!result.isValid && result.error ? (
        <div className="mb-5 rounded-xl border border-amber-400/60 bg-amber-400/10 px-4 py-3 text-sm text-amber-400">
          {result.error}
        </div>
      ) : null}

      {shouldWarnLiquidation ? (
        <div className="mb-5 animate-pulse rounded-xl border border-[#ef4444] bg-[#ef4444]/20 px-4 py-3 text-sm font-bold tracking-wide text-[#ef4444]">
          LIQUIDATION TRIGGERS BEFORE STOP LOSS
        </div>
      ) : null}

      <div className={`${!result.isValid ? "pointer-events-none blur-[2px] opacity-60" : ""}`}>
        <div className="mb-5 rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 p-4">
          <div className="text-xs uppercase tracking-widest text-[#ff7a00]">The Death Zone</div>
          <div className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-[#ef4444]">
            {formatPrice(result.estimatedLiquidationPriceSimple)}
          </div>
          <p className="mt-1 text-xs text-[#888888]">Simplified model. May vary by exchange.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <div className="text-xs uppercase tracking-widest text-[#ff7a00]">Damage Report</div>
            <div className="mt-1 font-mono text-xl font-semibold text-[#ef4444]">
              {formatUsd(result.lossAtStopUsd)}
            </div>
            <div className="text-xs text-[#888888]">Includes est. fees</div>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <div className="text-xs uppercase tracking-widest text-[#ff7a00]">Estimated Fees</div>
            <div className="mt-1 font-mono text-xl font-semibold text-[#ffffff]">{formatUsd(result.feesUsd)}</div>
            <div className="text-xs text-[#888888]">Round-trip taker estimate</div>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <div className="text-xs uppercase tracking-widest text-[#ff7a00]">Notional Size</div>
            <div className="mt-1 font-mono text-xl font-semibold text-[#ffffff]">
              {formatUsd(result.notionalSizeUsd)}
            </div>
            <div className="font-mono text-xs text-[#888888]">{formatPrice(result.positionSizeBase)} base units</div>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <div className="text-xs uppercase tracking-widest text-[#ff7a00]">Margin Required</div>
            <div className="mt-1 font-mono text-xl font-semibold text-[#ffffff]">
              {formatUsd(result.marginRequiredUsd)}
            </div>
            <div className="text-xs text-[#888888]">{result.mode === "RISK_SIZING" ? "Risk-sized" : "Manual sized"}</div>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4 sm:col-span-2">
            <div className="text-xs uppercase tracking-widest text-[#ff7a00]">Target Projection</div>
            <div className="mt-1 flex items-end justify-between gap-3">
              <div className="font-mono text-xl font-semibold text-[#ff7a00]">
                {result.profitAtTargetUsd === null ? "N/A" : formatUsd(result.profitAtTargetUsd)}
              </div>
              <div className={`font-mono text-lg font-bold ${rrColor(result.riskRewardRatio)}`}>
                {result.riskRewardRatio === null ? "R:R N/A" : `R:R ${formatRatio(result.riskRewardRatio)}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-[#888888]">
        <AlertTriangle size={14} />
        <span>High leverage and tight stops materially increase liquidation risk.</span>
      </div>
    </section>
  );
}

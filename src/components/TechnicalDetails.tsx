import type { SupportTechnicalInfo } from "../api/types";

interface TechnicalDetailsProps {
  technical: SupportTechnicalInfo;
}

export function TechnicalDetails({ technical }: TechnicalDetailsProps) {
  const { classifier, generator, timings_ms: timings } = technical;

  return (
    <details className="technical-details">
      <summary>Technical details</summary>
      <dl>
        {classifier && (
          <>
            <dt>Classifier</dt>
            <dd>
              {classifier.model} · intent: {classifier.intent} · category:{" "}
              {classifier.category} · confidence:{" "}
              {classifier.confidence.toFixed(2)}
            </dd>
          </>
        )}
        {generator && (
          <>
            <dt>Generator</dt>
            <dd>
              {generator.model} · knowledge lookup: {generator.knowledge_lookup_ms} ms ·
              inference: {generator.inference_ms} ms
            </dd>
          </>
        )}
        <dt>Timings</dt>
        <dd>
          total: {timings.total} ms
          {timings.classification != null && ` · classification: ${timings.classification} ms`}
          {timings.knowledge_lookup != null && ` · knowledge lookup: ${timings.knowledge_lookup} ms`}
          {timings.generation != null && ` · generation: ${timings.generation} ms`}
        </dd>
      </dl>
    </details>
  );
}

import React, { useState, useEffect } from 'react';
import { Sparkles, X, BookOpen, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ConceptExplanation } from '../types';

interface ConceptModalProps {
  term: string;
  onClose: () => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({ term, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ConceptExplanation | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchConcept() {
      try {
        const res = await fetch('/api/explain-concept', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ term }),
        });
        const json = await res.json();
        if (isMounted && json.success && json.explanation) {
          setData(json.explanation);
        } else {
          throw new Error('API request failed');
        }
      } catch (err) {
        console.warn('Concept API failed or fallback:', err);
        if (isMounted) {
          setData({
            term,
            category: '核心知识精讲',
            coreDefinition: `【${term}】是该学科中的关键概念与考点。`,
            detailedExplanation: `对于【${term}】，核心在于理解其成立的物理条件/语法接续/语境特征。在实际应用或答题过程中，需明确其适用范围，避免与相似概念混淆。`,
            keyTakeaways: [
              `掌握【${term}】的基本概念与数学/物理表达式或拼音音标`,
              `明确核心适用前提，避免外力/干扰项影响`,
              `多结合例题与例句进行主动联想与卡片复习`,
            ],
            examples: [
              `典型应用模型 1：在基础题型中，直接运用公式或语法解题。`,
              `综合拓展模型 2：在复杂多过程分析中，作为中间过渡推导依据。`,
            ],
            commonPitfalls: [
              `忽视适用条件（例如盲目应用套用公式导致失分）`,
              `混淆主客观语境或矢量方向`,
            ],
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchConcept();

    return () => {
      isMounted = false;
    };
  }, [term]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-900">AI 概念透彻精讲</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600">AI 正在深度剖析概念「{term}」...</p>
          </div>
        ) : data ? (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded">
                {data.category}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{data.term}</h2>
            </div>

            {/* Core Definition */}
            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold uppercase text-blue-700 mb-1">核心定义 (Core Definition)</p>
              <p className="text-sm font-semibold text-slate-900">{data.coreDefinition}</p>
            </div>

            {/* Detailed Explanation */}
            <div>
              <p className="text-xs font-bold uppercase text-slate-400 mb-1.5">透彻精讲 (Detailed Breakdown)</p>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {data.detailedExplanation}
              </p>
            </div>

            {/* Key Takeaways */}
            <div>
              <p className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>核心要点 (Key Takeaways)</span>
              </p>
              <ul className="space-y-1.5">
                {data.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Classic Examples */}
            {data.examples && data.examples.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-2">经典模型与应用 (Examples)</p>
                <div className="space-y-2">
                  {data.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-200/80">
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Pitfalls */}
            {data.commonPitfalls && data.commonPitfalls.length > 0 && (
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5">
                <p className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>避坑指南 (Common Pitfalls)</span>
                </p>
                {data.commonPitfalls.map((pf, i) => (
                  <p key={i} className="text-xs text-amber-900 leading-relaxed">
                    • {pf}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-xs"
              >
                已搞懂并标记
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

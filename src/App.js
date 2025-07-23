import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState("extract");
  const [input, setInput] = useState("");
  const [style, setStyle] = useState(null);
  const [reviewTarget, setReviewTarget] = useState("");
  const [reviewResult, setReviewResult] = useState(null);

  const mockExtractStyle = (text) => {
    return {
      language: "平实自然，如朋友聊天",
      syntax: "短句、生活化对白",
      tone: "温暖克制，细腻感怀",
      quotes: [
        "昨天坐出租车，司机大叔大概和我爸年纪差不多。",
        "活着的时候有过高光时刻，这就够了。",
        "那几年日子过得很潇洒。"
      ]
    };
  };

  const mockGenerateReview = (style, text) => {
    return {
      见: "像是在副驾驶听朋友讲故事，从一句玩笑话里读出了深情。",
      感: "嘴上嫌弃，行动里藏着爱，原来这才是婚姻里的默契。",
      思: "调侃与承诺并存，是最朴实的幸福模样。",
      行: "别等失去才懂得珍惜，日常里藏着最长情的守候。"
    };
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>文风点评助手</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setStep("extract")} style={{ marginRight: "1rem" }}>
          提取文风
        </button>
        <button onClick={() => setStep("review")}>生成点评</button>
      </div>

      {step === "extract" && (
        <div>
          <textarea
            rows={8}
            style={{ width: "100%", padding: "0.5rem" }}
            placeholder="粘贴文章内容..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#0070f3", color: "#fff", border: "none" }}
            onClick={() => setStyle(mockExtractStyle(input))}
          >
            提取文风
          </button>

          {style && (
            <div style={{ marginTop: "1rem" }}>
              <p><strong>语言风格：</strong>{style.language}</p>
              <p><strong>句式特点：</strong>{style.syntax}</p>
              <p><strong>情感基调：</strong>{style.tone}</p>
              <p><strong>典型句子：</strong></p>
              <ul>
                {style.quotes.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {step === "review" && (
        <div>
          {!style && <p style={{ color: "red" }}>⚠️ 请先提取文风</p>}
          <textarea
            rows={8}
            style={{ width: "100%", padding: "0.5rem" }}
            placeholder="粘贴待点评文章..."
            value={reviewTarget}
            onChange={(e) => setReviewTarget(e.target.value)}
          ></textarea>
          <button
            disabled={!style}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#10b981", color: "#fff", border: "none" }}
            onClick={() => setReviewResult(mockGenerateReview(style, reviewTarget))}
          >
            生成点评
          </button>

          {reviewResult && (
            <div style={{ marginTop: "1rem" }}>
              <p><strong>见：</strong>{reviewResult.见}</p>
              <p><strong>感：</strong>{reviewResult.感}</p>
              <p><strong>思：</strong>{reviewResult.思}</p>
              <p><strong>行：</strong>{reviewResult.行}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

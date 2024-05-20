const stageButtons = ({stage, nextStage, backStage, confirm}) => {
    console.log(stage)
  if (stage === 0) {
    return (
      <div className="stage1-btn">
        <button className="stage-btn" onClick={nextStage}>
          Next
        </button>
      </div>
    );
  } else if (stage === 1) {
    return (
      <div className="stage2-btn">
        <button className="stage-btn" onClick={backStage}>
          Back
        </button>
        <button className="stage-btn" onClick={nextStage}>
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className="stage2-btn">
        <button className="stage-back" onClick={backStage}>
          Back
        </button>
        <button className="stage-btn" onClick={confirm}>
          Create Offer
        </button>
      </div>
    );
  }
};


export default stageButtons;
import './PlannerOverview.css';

function PlannerOverview({ total, pending, completed }) {
  return (
    <section className="planner-overview" aria-label="Task overview">
      <div className="planner-overview__label"><span className="planner-overview__dot" /> YOUR PLAN AT A GLANCE</div>
      <div className="planner-overview__stats">
        <div className="planner-overview__stat"><strong>{pending}</strong><span>to work on</span></div>
        <div className="planner-overview__divider" />
        <div className="planner-overview__stat"><strong>{completed}</strong><span>completed</span></div>
        <div className="planner-overview__divider" />
        <div className="planner-overview__stat"><strong>{total}</strong><span>total tasks</span></div>
      </div>
      <div className="planner-overview__mark" aria-hidden="true">✳</div>
    </section>
  );
}

export default PlannerOverview;
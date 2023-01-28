import "./ModalSettings.css";

function ModalSettings({ active, setActive, children }) {
  return (
    <div
      className={active ? "ModalSettings active" : "ModalSettings"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalSettings;

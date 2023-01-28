import "./Modal.css";

function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? "Modal active" : "Modal "}
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

export default Modal;



const BookModal = ({ book, show, handleClose }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
        <section className="modal-main">
            <button onClick={handleClose}>close</button>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.description}</p>
        </section>
        </div>
    );
    }   
    
let modal = (id1, id2) => {
    let modalDate = id1;
    let close = id2;
    modalDate.style.display = "block";
    close.onclick = function () {
      modalDate.style.display = "none";
    }
    document.querySelector('.read').onclick = function () {
      modalDate.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modalDate) {
        modalDate.style.display = "none";
      }
    }
   }
   
  export { modal };
  
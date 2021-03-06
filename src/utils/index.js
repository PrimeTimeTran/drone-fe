export const showToast = (correct, msg) => {
  const x = document.getElementById("toast");
  const el = document.getElementById("toast-header");
  const toastBG = document.getElementsByClassName('toast-header')
  if (correct) {
    el.innerHTML = msg;
    toastBG[0].classList.remove("bg-danger");
    toastBG[0].classList.add("bg-success");
  } else {
    el.innerHTML = "Incorrect";
    toastBG[0].classList.remove("bg-success");
    toastBG[0].classList.add("bg-danger");
  }
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
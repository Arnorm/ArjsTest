function openForm() {
  console.log("opened form");
  document.getElementById("myForm").style.display = "block";
}
  
function closeForm(form) {
  console.log("closed form");
  form.submit();
  window.close();
} 
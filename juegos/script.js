
function abrirVentanaEmergente() {
  document.getElementById("ventanaEmergente").style.display = "block";
}
function cerrarVentanaEmergente() {
  document.getElementById("ventanaEmergente").style.display = "none";
}
document.addEventListener("DOMContentLoaded", abrirVentanaEmergente);

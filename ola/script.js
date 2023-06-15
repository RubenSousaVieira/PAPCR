// Função para lidar com o evento de reserva
function handleReservation(event) {
  event.preventDefault();

  // Obtém os dados da reserva do formulário
  const product = event.target.dataset.product;
  const clientName = event.target.querySelector('.client-name').value;
  const quantity = event.target.querySelector('.quantity').value;

  // Cria um objeto reserva
  const reservation = {
    product,
    clientName,
    quantity,
  };

  // Adiciona a reserva à lista de reservas
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
  reservations.push(reservation);

  // Salva as reservas no armazenamento local
  localStorage.setItem('reservations', JSON.stringify(reservations));

  // Limpa o formulário após a reserva
  event.target.reset();

  // Atualiza a exibição das reservas
  displayReservations();
}

// Função para exibir as reservas na página
function displayReservations() {
  const reservationsList = document.getElementById('reservation-list');

  // Limpa o conteúdo anterior da lista de reservas
  reservationsList.innerHTML = '';

  // Obtém as reservas do armazenamento local
  const storedReservations = JSON.parse(localStorage.getItem('reservations'));

  // Verifica se existem reservas armazenadas
  if (!storedReservations || storedReservations.length === 0) {
    reservationsList.innerHTML = '<p>Não há reservas no momento.</p>';
    return;
  }

  // Cria o elemento de lista para cada reserva
  storedReservations.forEach((reservation) => {
    const reservationItem = document.createElement('div');
    reservationItem.classList.add('reservation-item');

    // Cria os elementos de informações da reserva
    const productName = document.createElement('h3');
    productName.textContent = reservation.product;

    const clientName = document.createElement('p');
    clientName.textContent = `Nome do Cliente: ${reservation.clientName}`;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantidade: ${reservation.quantity}`;

    // Adiciona as informações da reserva ao elemento de lista
    reservationItem.appendChild(productName);
    reservationItem.appendChild(clientName);
    reservationItem.appendChild(quantity);

    // Adiciona o elemento de lista à lista de reservas
    reservationsList.appendChild(reservationItem);
  });
}

// Captura o evento de envio do formulário de reserva
document.addEventListener('DOMContentLoaded', () => {
  const reserveForms = document.querySelectorAll('.reserve-form');
  reserveForms.forEach((form) => {
    form.addEventListener('submit', handleReservation);
  });

  // Exibe as reservas quando a página carrega
  displayReservations();
});
// Função para limpar as reservas armazenadas
function clearReservations() {
  localStorage.removeItem('reservations');
  displayReservations();
}

// Função para imprimir as reservas
function printReservations() {
  // Obtém as reservas do armazenamento local
  const storedReservations = JSON.parse(localStorage.getItem('reservations'));

  // Verifica se existem reservas armazenadas
  if (!storedReservations || storedReservations.length === 0) {
    console.log('Não há reservas para imprimir.');
    return;
  }

  // Cria um novo pop-up
  const printWindow = window.open('', '_blank');

  // Cria o conteúdo HTML para imprimir as reservas
  let printContent = '<h1>Reservas</h1>';

  // Adiciona as informações de cada reserva ao conteúdo
  storedReservations.forEach((reservation) => {
    printContent += `<h3>${reservation.product}</h3>`;
    printContent += `<p>Nome do Cliente: ${reservation.clientName}</p>`;
    printContent += `<p>Quantidade: ${reservation.quantity}</p>`;
    printContent += '<hr>';
  });

  // Define o conteúdo do pop-up
  printWindow.document.open();
  printWindow.document.write(`<html><head><title>Reservas</title></head><body>${printContent}</body></html>`);
  printWindow.document.close();

  // Imprime o pop-up
  printWindow.print();
}

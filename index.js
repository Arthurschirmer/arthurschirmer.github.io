function sortProducts(criteria) {
  let products = Array.from(document.querySelectorAll('.product'));

  if (criteria === 'name') {
    products.sort((a, b) => {
      let nameA = a.querySelector('h2').innerText.toUpperCase();
      let nameB = b.querySelector('h2').innerText.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (criteria === 'price') {
    products.sort((a, b) => {
      let priceA = parseFloat(a.querySelector('.price').innerText.replace(/[Rp,.]/g, ''));
      let priceB = parseFloat(b.querySelector('.price').innerText.replace(/[Rp,.]/g, ''));
      return priceA - priceB;
    });
  }

  let container = document.getElementById('products');
  container.style.display = 'flex'; 
  container.style.flexWrap = 'wrap'; 
  container.style.justifyContent = 'space-between'; 

  container.innerHTML = ''; 

  products.forEach((product, index) => {
    product.style.width = 'calc(25% - 15px)'; 
    product.style.marginRight = '15px'; 

    container.appendChild(product);

    if ((index + 1) % 4 === 0) {
      let lineBreak = document.createElement('br');
      container.appendChild(lineBreak);
    }
  });
}
let currentPage = 1;
const productsPerPage = 4;
let products = Array.from(document.querySelectorAll('.product'));
let sortedProducts = [...products];

function renderProducts(pageNumber) {
  const container = document.querySelector('.products-grid');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  const startIndex = (pageNumber - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  currentProducts.forEach(product => container.appendChild(product));
  updatePageInfo();
}

function updatePageInfo() {
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
}

function sortProducts(criteria) {
  if (criteria === 'name') {
    sortedProducts.sort((a, b) => {
      const nameA = a.querySelector('h2').innerText.toUpperCase();
      const nameB = b.querySelector('h2').innerText.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (criteria === 'price') {
    sortedProducts.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price').innerText.replace(/[Rp,.]/g, ''));
      const priceB = parseFloat(b.querySelector('.price').innerText.replace(/[Rp,.]/g, ''));
      return priceA - priceB;
    });
  }
  currentPage = 1;
  renderProducts(currentPage);
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts(currentPage);
  }
});

// Mostra a primeira página inicialmente
renderProducts(currentPage);


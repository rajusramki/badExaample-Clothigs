// document.addEventListener('DOMContentLoaded', function () {
//     const container = document.querySelector('.mens-products-container');
//     const products = document.querySelectorAll('.mens-product');
//     const prevBtn = document.querySelector('.fa-circle-chevron-left');
//     const nextBtn = document.querySelector('.fa-circle-chevron-right');

//     let scrollAmount = 0;
//     const productWidth = products[0].offsetWidth; // Get the width of one product
//     const totalProducts = products.length; // Total number of products
//     const visibleProducts = 3; // Number of visible products at a time

//     // Clone the first product and append it to the end for the looping effect
//     const firstProduct = products[0].cloneNode(true);
//     container.appendChild(firstProduct);

//     // Update the total products count after cloning
//     const updatedTotalProducts = totalProducts + 1;

//     // Next button click event
//     nextBtn.parentElement.addEventListener('click', function (e) {
//         e.preventDefault(); // Prevent default action (page refresh)

//         scrollAmount += productWidth;

//         // When scrolling to the last original product, jump to the first product
//         if (scrollAmount >= updatedTotalProducts * productWidth) {
//             scrollAmount = productWidth; // Jump to the first original product
//             container.style.transition = 'none'; // Disable transition for instant jump
//             container.style.transform = `translateX(-${scrollAmount}px)`;
//             setTimeout(() => {
//                 container.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//             }, 50);
//         }

//         container.style.transform = `translateX(-${scrollAmount}px)`;
//     });

//     // Previous button click event
//     prevBtn.parentElement.addEventListener('click', function (e) {
//         e.preventDefault(); // Prevent default action (page refresh)

//         if (scrollAmount <= 0) {
//             scrollAmount = (updatedTotalProducts - 1) * productWidth; // Jump to the last original product
//             container.style.transition = 'none'; // Disable transition for instant jump
//             container.style.transform = `translateX(-${scrollAmount}px)`;
//             setTimeout(() => {
//                 container.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//             }, 50);
//         } else {
//             scrollAmount -= productWidth;
//         }

//         container.style.transform = `translateX(-${scrollAmount}px)`;
//     });
// });



const menuTrigger = document.getElementById('menu-trigger');
const menuItems = document.getElementById('menu-items');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let isRotated = false;

menuTrigger.addEventListener('click', () => {
    menuItems.classList.toggle('active');
    isRotated = !isRotated;

    if (isRotated) {
        bar1.style = "transform: rotate(45deg); background-color: #dc3545; transition: all 0.5s ease-in-out; position: absolute;";
        bar3.style = "transform: rotate(-45deg); background-color: #dc3545; transition: all 0.5s ease-in-out; position: absolute;";
        bar2.style = "visibility: hidden;";
    } else {
        bar1.style = "transform: rotate(0deg); background-color: white; transition: all 0.5s ease-in-out;";
        bar3.style = "transform: rotate(0deg); background-color: white; transition: all 0.5s ease-in-out;";
        bar2.style = "visibility: visible;";
    }
});


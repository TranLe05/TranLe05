const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // hiện và ẩn icon trước/sau dựa theo giá trị cuộn bên trái băng chuyền
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // lấy giá trị độ rộng cuộn lớn nhất
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // lấy độ rộng ảnh và tăng giá trị lề thêm 14
        // nếu ấn vào icon là bên trái, giảm độ rộng từ băng chuyền cuộn trái, ngược lại thì thêm vào
        carousel.scrollLeft += icon.id == "left" ? - firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // gọi hàm ẩn hiện icon sau 60ms
    });
});

const autoSlide = () => {
    // Nếu không có hình bên trái thì cuộn rồi trả về vị trí này
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))
        return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scroll > prevScrollLeft){ //Nếu người dùng cuộn sang phải
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    //Nếu người dùng cuộn sang trái
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // cập nhật giá trị biến toàn cục khi sự kiện chuột xuống
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // kéo băng chuyền qua trái dựa trên trỏ chuột
    if(!isDragStart) 
        return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging)
        return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
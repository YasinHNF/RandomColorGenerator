const colorsContainer = document.getElementById('colors-container');
const colorGenerator = document.getElementById('generate-btn');

colorGenerator.addEventListener('click', generateColors);


function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, '0')
}

function generateColors() {
    let html = '';


    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        html += `
            <div class="color-item js-color-item" data-color="${color}" data-id="${i}" style="background-color: ${color}">
                <div class="color-item-info">
                    ${color}
                    <button class="copy-button js-copy-button" data-color="${color}" data-id="${i}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                </div>
            </div>
        `
    };

    colorsContainer.innerHTML = html;

    const checkIcon = '<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>'

    document.querySelectorAll('.js-color-item').forEach((colorItem) => {
        colorItem.addEventListener('click', () => {
            const { color } = colorItem.dataset;
            try {
                navigator.clipboard.writeText(color);
            } catch (error) {
                console.log(error);
            };

            const copyButton = document.querySelector(`.js-copy-button[data-id="${colorItem.dataset.id}"]`);
            const buttonContent = copyButton.innerHTML;
            copyButton.innerHTML = checkIcon;

            setTimeout(() => {
                copyButton.disabled = false;
                copyButton.innerHTML = buttonContent;
            }, 1000)


        }) 


    });



};


generateColors();
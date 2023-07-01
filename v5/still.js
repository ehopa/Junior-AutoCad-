const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let isDrawing = false;
        let shapes = [];

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);
        document.getElementById("clearButton").addEventListener("click", clearCanvas);

        function startDrawing(e) {
            isDrawing = true;
            const startX = e.offsetX;
            const startY = e.offsetY;
            const shape = document.getElementById("shapeSelect").value;
            const color = document.getElementById("colorPicker").value;
            const thickness = document.getElementById("thicknessSlider").value;

            shapes.push({ startX, startY, shape, color, thickness });
        }

        function draw(e) {
            if (!isDrawing) return;
            const endX = e.offsetX;
            const endY = e.offsetY;
            const shape = shapes[shapes.length - 1];
            shape.endX = endX;
            shape.endY = endY;

            redrawCanvas();
            drawShapes();
        }

        function stopDrawing() {
            isDrawing = false;
        }

        function redrawCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawShapes() {
            for (let i = 0; i < shapes.length; i++) {
                const shape = shapes[i];
                ctx.beginPath();
                if (shape.shape === "line") {
                    ctx.moveTo(shape.startX, shape.startY);
                    ctx.lineTo(shape.endX, shape.endY);
                } else if (shape.shape === "rectangle") {
                    ctx.rect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
                } else if (shape.shape === "circle") {
                    const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
                    ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
                }
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.thickness;
                ctx.stroke();
            }
        }

        function clearCanvas() {
            shapes = [];
            redrawCanvas();
        }
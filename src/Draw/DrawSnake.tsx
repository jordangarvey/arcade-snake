import { boardSize, blockSize } from "../Constants";

function DrawGrid(ctx: CanvasRenderingContext2D, snakePosition: coordinates[], snakeDirection: direction) {
	ctx.fillStyle = "green";
	ctx.fillRect(snakePosition[0].x, snakePosition[0].y, blockSize, blockSize);
}

export default DrawGrid;

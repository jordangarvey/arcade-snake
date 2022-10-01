import { boardSize, blockSize } from "../Constants";

function DrawGrid(ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = "#230A4B";
	ctx.fillRect(0, 0, boardSize, boardSize);
	ctx.fillStyle = "#e5d864";
	ctx.fillRect(0, 0, boardSize, blockSize);
	ctx.fillRect(0, 0, blockSize, boardSize);
	ctx.fillRect(boardSize - blockSize, 0, blockSize, boardSize);
	ctx.fillRect(0, boardSize - blockSize, boardSize, blockSize);
}

export default DrawGrid;

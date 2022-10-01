import { blockSize } from "../Constants";

function DrawGrid(ctx: CanvasRenderingContext2D, coordinates: { x: number; y: number; }) {
	ctx.fillStyle = "white";

	const { x, y } = coordinates;

	ctx.fillRect(x, y, blockSize, blockSize);
}

export default DrawGrid;

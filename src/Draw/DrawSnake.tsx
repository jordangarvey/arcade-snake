import { blockSize } from "../Constants";

function DrawSnake(ctx: CanvasRenderingContext2D, snakePosition: coordinates[]) {
	ctx.fillStyle = "green";
	for(const c of snakePosition) {
		ctx.fillRect(c.x, c.y, blockSize, blockSize);
	}
}

export default DrawSnake;

import { useCallback, useEffect, useRef, useState } from "react";

import { blockSize, boardSize } from "./Constants";
import DrawGrid from "./Draw/DrawGrid";
import DrawSnake from "./Draw/DrawSnake";

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);

	const [snakePosition, setSnakePosition] = useState([{ x: boardSize / 2, y: boardSize / 2}]);
	const [snakeDirection, setSnakeDirection] = useState<direction>("right");
	const [frameRate, setFrameRate] = useState(100);

	const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
		console.log(`Drawing frame ${frameCount}`);

		DrawGrid(ctx);
		DrawSnake(ctx, snakePosition, snakeDirection);
	}, [snakePosition, snakeDirection]);

	function onChangeDirection(event: KeyboardEvent) {
		switch(event.key) {
			case "ArrowRight":
				setSnakeDirection("right");
			break;

			case "ArrowDown":
				setSnakeDirection("down");
			break;

			case "ArrowLeft":
				setSnakeDirection("left");
			break;

			case "ArrowUp":
				setSnakeDirection("up");
			break;
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", onChangeDirection);
	}, []);

	useEffect(() => {
		let frameCount = 0;

		const intervalId = setInterval(() => {
			const canvas = canvasRef.current;

			if(canvas) {
				canvas.height = boardSize;
				canvas.width = boardSize;

				ctx.current = canvas.getContext("2d");

				if(ctx.current) {
					draw(ctx.current!, frameCount);
					frameCount++;

					// Recalculate the snake
					let newCoordinates = snakePosition;
					switch(snakeDirection) {
						case "right":
							newCoordinates[0].x += blockSize;
						break;

						case "down":
							newCoordinates[0].y += blockSize;
						break;

						case "left":
							newCoordinates[0].x -= blockSize;
						break;

						case "up":
							newCoordinates[0].y -= blockSize;
						break;
					}

					setSnakePosition(newCoordinates);
				}
			}
		}, frameRate);

		return () => {
			clearInterval(intervalId);
		}
	}, [draw, frameRate, snakeDirection, snakePosition]);

	return <canvas ref={canvasRef}/>;
}

export default App;

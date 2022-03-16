// input: (#FFFFFF, 0.5), output: rgba(255, 255, 255, 0.5)
export const hexToRgba = (rgbaColor: string, opacity: number): string =>
	`rgba(${parseInt(rgbaColor.substring(1, 3), 16)}, ${parseInt(rgbaColor.substring(3, 5), 16)}, ${parseInt(
		rgbaColor.substring(5, 7),
		16,
	)}, ${opacity})`;

export const generatePath = ({ uri, base }: { uri: string; base?: string }) => `${base || ''}${uri}`;

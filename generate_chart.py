from PIL import Image, ImageDraw

def get_bezier_points(p0, p1, p2, num_points=100):
    points = []
    for i in range(num_points + 1):
        t = i / num_points
        x = (1 - t)**2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t)**2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        points.append((x, y))
    return points

def draw_lotus_chart(output_path):
    size = 1000
    # Create a transparent image
    img = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    line_color = (0, 0, 0, 255) # Black lines (can be tinted in React Native)
    line_width = 8

    # Outer square
    draw.rectangle([line_width/2, line_width/2, size-line_width/2, size-line_width/2], outline=line_color, width=line_width)

    # Diagonal segments
    draw.line([(0, 0), (250, 250)], fill=line_color, width=line_width)
    draw.line([(1000, 0), (750, 250)], fill=line_color, width=line_width)
    draw.line([(0, 1000), (250, 750)], fill=line_color, width=line_width)
    draw.line([(1000, 1000), (750, 750)], fill=line_color, width=line_width)

    # Bezier curves for petals
    curves = [
        # Top petal
        [(500, 0), (0, 250), (500, 500)],
        [(500, 0), (1000, 250), (500, 500)],
        # Bottom petal
        [(500, 1000), (0, 750), (500, 500)],
        [(500, 1000), (1000, 750), (500, 500)],
        # Left petal
        [(0, 500), (250, 0), (500, 500)],
        [(0, 500), (250, 1000), (500, 500)],
        # Right petal
        [(1000, 500), (750, 0), (500, 500)],
        [(1000, 500), (750, 1000), (500, 500)]
    ]

    for p0, p1, p2 in curves:
        points = get_bezier_points(p0, p1, p2)
        draw.line(points, fill=line_color, width=line_width)

    # Center square
    cs = 60 # center square half-size
    draw.rectangle([500-cs, 500-cs, 500+cs, 500+cs], fill=(255, 255, 255, 0), outline=line_color, width=line_width)
    
    # We want to clear out the lines inside the center square
    # Since we drew the lines first, we can just draw a transparent rectangle with 'replace' composition?
    # Pillow doesn't have an easy replace mode in basic Draw. 
    # But wait, we can just clear the pixels.
    pixels = img.load()
    for x in range(500-cs+line_width, 500+cs-line_width+1):
        for y in range(500-cs+line_width, 500+cs-line_width+1):
            pixels[x, y] = (255, 255, 255, 0)

    # Add OM symbol in the center (optional, we can add it in React Native as Text)
    # It's better to add OM as Text in React Native so it looks crisp and themeable.

    img.save(output_path, "PNG")
    print(f"Lotus chart saved to {output_path}")

if __name__ == "__main__":
    draw_lotus_chart("src/assets/images/lotus_kundali.png")

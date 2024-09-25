export class ImageHandler {

    static ctx = undefined;


    static getImageData(image, size) {
        if (this.ctx == undefined) {
            this.ctx = document.createElement("canvas").getContext("2d");
        }

        this.ctx.canvas.width = size.x;
        this.ctx.canvas.height = size.y;

        this.ctx.drawImage(image, 0, 0, size.x, size.y);
        return (this.ctx.getImageData(0, 0, size.x, size.y));
        
    }


    static turnGrayscale(imageData) {
        var gdata = new ImageData(imageData.width, imageData.height);

        for (let i = 0; i < imageData.data.length; i+=4) {
            gdata.data[i] = (0.2126 * this.srgbToLinear(imageData.data[i])) +
                (0.7152 * this.srgbToLinear(imageData.data[i+1])) +
                (0.0722 * this.srgbToLinear(imageData.data[i+2]));

            gdata.data[i+1] = gdata.data[i];
            gdata.data[i+2] = gdata.data[i];
            gdata.data[i+3] = 255;
        }

        return gdata;

    }


    static getImageMask(imageData) {
       
        var mask = new Array(imageData.data.length / 4);
    
    
        for (let i = 0; i < mask.length; i++) {
            if (imageData.data[4*i] > 127) {
                mask[i] =  true;
            } else {
                mask[i] =  false;

            }
        }

        return mask;
    
    }

    static srgbToLinear(channel) {
        channel /= 255;
        if (channel <= 0.04045) return (255 * channel / 12.92);
        return (255 * Math.pow((channel + 0.055) / 1.055, 2.4));
    }


}
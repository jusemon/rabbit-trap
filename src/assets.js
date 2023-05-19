/**
 * A class that generates an image from pixel data using a specified color palette.
 */
class Img {
  /**
   * Constructor for Img class.
   * @constructor
   * @param {Object} config - Configuration object for Img instance.
   * @param {string} config.data - Pixel data in string format.
   * @param {number} config.height - Height of the image in pixels.
   * @param {number} config.width - Width of the image in pixels.
   * @param {string} config.colors - Color palette for the image in string format.
   */
  constructor(config) {
    this.data = [];
    config.data.replace(/./g, (a) => {
      const z = a.charCodeAt();
      this.data.push(z & 7);
      this.data.push((z >> 3) & 7);
    });
    this.height = config.height;
    this.width = config.width;
    this.colors = config.colors;
    this.image = null;
  }

  /**
   * Draws an image from pixel data using a specified color palette.
   *
   * @param {boolean} [rebuild=false] - Whether to build the image again.
   * @returns {Promise<HTMLImageElement>} A promise that resolves with the generated image as an HTML image element.
   */
  async getImage(rebuild = false) {
    if (this.image && !rebuild) {
      return this.image;
    }

    return (this.image = await this._build());
  }

  /**
   * Draws an image from pixel data using a specified color palette.
   *
   * @returns {Promise<HTMLImageElement>} A promise that resolves with the generated image as an HTML image element.
   */
  async _build() {
    return new Promise((resolve, reject) => {
      try {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;
        ctx.beginPath();
        for (let yIndex = 0; yIndex < this.height; yIndex++) {
          let xPos = this.width * 2 - 1;
          for (let xIndex = 0; xIndex < this.width; xIndex++) {
            if (this.data[yIndex * this.width + xIndex]) {
              ctx.fillStyle =
                "#" +
                this.colors.substr(
                  6 * (this.data[yIndex * this.width + xIndex] - 1),
                  6
                );
              ctx.fillRect(xIndex, yIndex, 1, 1);
            }
            xPos--;
          }
        }

        const img = new Image();
        img.onload = () => {
          resolve((this.image = img));
        };
        img.onerror = (err) => {
          reject(err);
        };
        img.src = ctx.canvas.toDataURL("image/png");
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const tileSetImg = new Img({
  data: "QSRSRSRSRSRSRSRSRSRSRSRKQSRSRSRKQSRSRSRSRSRSRSRSRSRSRSRKQSRSRSRKRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTRTRTRTRTRTRTRTRTRTRTRRRTRTRTRRRTRTRTRTRTRTRTRTRTRTRTRRRTRTRTRRbTbTbTbTbTbTbTbTbTbTbTRRbTbTbTRRbTbTbTbTbTbTbTbTbTbTbTRRbTbTbTRbleleleleleleleleleleleTbleleleTbleleleleleleleleleleleTbleleleTRdmemememememememememeeRRdmemmeRRdmemememememememememmeRRdmemmeRRbememememememememememTRRbemelTRRbemememememememememelTRRbemelTRRbm]k]k]k]k]k]k]k]k]kmTRRbm]kmTRRbm]k]k]k]k]k]k]k]k]kmTRRbm]kmTRblmk[k[k[k[k[k[k[k[k[eeTblm[]eeTblm[[][][][][][][][][eeTblm[[eeTRll[k[k[k[k[k[k[k[k[[meRRllk[meRRll[][][][][][][][][]meRRll[[meRRbm][s^s^s^s^s^s^s^sklTRRbm]klTRRbm]k]k]k]k]k]k]k]k]kmTRRbm]kmTRRbe]]^v^v^v^v^v^v^v^kmTRRbe]kmTRRbmlmlmlmlmlmlmlmlmlmlTRRbmlmlTRblm[sv^v^v^v^v^v^v^^]eeTblm[]eeTbllmlmlmlmlmlmlmlmlmlmdTbllmlmdTRllkssvvvvvvvvvvvvv^[meRRllk[meRRleleleleleleleleleleleRRleleleRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRbTbTbTbTbTbTbTbTbTbTbTRRbTbTbTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRQRRRRRRRRRRRRRRRRRRRRRRJQRRRRRRJblm[svvvvvvvvvvvvv^^]eeTblm[]eeTQSRSRSRSRSRSRSRKRSRSRSRSblm[]eeTRllkssvvvvvvvvvvvvv^[meRRllk[meRRRRRRRRRRRRRRRRRRRRRRRRRRllk[meRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRRTRTRTRTRTRTRTRTRTRTRTRTbm]klTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRRbTbTbTbTbTbTbTRTbTbTbTbTbe]kmTRblm[svvvvvvvvvvvvv^^]eeTblm[]eeTbleleleleleleleTelelelelelm[]eeTRllkssvvvvvvvvvvvvv^[meRRllk[meRRdmemememememmeRmemememememk[meRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRbemememememelTRemememememe]klTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRRbm]k]k]k]k]kmTRk]k]k]k]k]k]kmTRblm[svvvvvvvvvvvvv^^]eeTblm[]eeTblm[[][][][]]eeT[][][][][][]]eeTRllkssvvvvvvvvvvvvv^[meRRllk[meRRllk[[][][]k[meR][]k[[][][]k[meRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRbm]k]k]k]k]klTRk]k]k]k]k]k]klTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRRbe]kmmlmle]kmTRmle]kmmlmle]kmTRblm[svvvvvvvvvvvvv^^]eeTblm[]eeTblm[]elmlmm[]eeTlmm[]elmlmm[]eeTRllkssvvvvvvvvvvvvv^[meRRllk[meRRllk[melellk[meRellk[melellk[meRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRbm]klTbTbm]klTRTbm]klTbTbm]klTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRRbe]kmTRRbe]kmTRRbe]kmTRRbe]kmTRblm[svvvvvvvvvvvvv^^]eeTblm[]eeTblm[]eeTblm[]eeTblm[]eeTblm[]eeTRllkssvvvvvvvvvvvvv^[meRRllk[meRRllk[meRRllk[meRRllk[meRRllk[meRRbm][vvvvvvvvvvvvvskklTRRbm]klTRRbm]klTRTbm]klTRRbm]klTRTbm]klTRRbe]]^vvvvvvvvvvvvv[kmTRRbe]kmTRRbe]kmTbTbe]kmTRRbe]kmTbTbe]kmTbblm[svvvvvvvvvvvvv^^]eeTblm[]eeTblm[]melelm[]eeTblm[]melelm[]melRllkssvsvsvsvsvsvsv^[meRRllk[meRRllkkemememk[meRRllkkemememkkemeRbm]svsvsvsvsvsvsvskklTRRbm]klTRRbm]emememe]klTRRbm]emememe]ememRbe]^s^s^s^s^s^s^s^[kmTRRbe]kmTRRbe]k]k]k]k]kmTRRbe]k]k]k]k]k]k]blm[[][][][][][][][][eeTblm[]eeTblm[[][][][][eeTblm[[][][][][][]Rll[][][][][][][][][]meRRllk[meRRll[][][][][[meRRllk[[][][][][][Rbm]k]k]k]k]k]k]k]k]kmTRRbm]kmTRRbm]k]k]k]k]kmTRRbm]k]k]k]k]k]k]RbmlmlmlmlmlmlmlmlmlmlTRRbmlmlTRRbmlmlmlmlmlmlTRRbe]kmmlmlmlmlmlbllmlmlmlmlmlmlmlmlmlmdTbllmlmdTbllmlmlmlmlmlmdTblm[]elmlmlmlmlmRleleleleleleleleleleleRRleleleRRleleleleleleleRRllk[melelelelelRbTbTbTbTbTbTbTbTbTbTbTRRbTbTbTRRbTbTbTbTbTbTbTRRbm]klTbTbTbTbTbQRRRRRRRRRRRRRRRRRRRRRRJQRRRRRRJQRRRRRRRRRRRRRRJRbe]kmTRRRRRRRRRvvvvvvvvvvvvvvvvvvvvvvvvRSRSRSRSRSRSRSRSblm[svvvvv^^]eeTIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvRRRRRRRRRRRRRRRRRllkssvvvvv^[meRIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvTRTRTRTRTRTRTRTRRbm][vvvvvskklTRIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvTbTbTbTbTbTbTbTbRbe]]^vvvvv[kmTRIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvelelelelelelelelblm[svvvvv^^]eeTIIIIIIIIvvvsvsvsvsvsvsvsvsvsvsvvmemememememememeRllkssvsvsv^[meRIIIIIIIIvvsvsvsvsvsvsvsvsvsv[vvvememememememememRbm][vsvsvskklTRIIIIIIIIvvvs^s^s^s^[^s^s^s^[]^vvk]k]k]k]k]k]k]k]Rbe]]^^s^sv[kmTRIIIIIIIIvv^^[][][][][][][][]svvv[k[k[][][][][k[kblm[[][][][]]eeTIIIIIIIIvvv^[[][][]k[[][][]kssvvk[k[[[][][]kk[k[Rllk[[][][]k[meRIIIIIIIIvvskk]k]k]k]k]k]k]k][vvv^s^sk]k]k]k]^s^sRbm]k]k]k]k]klTRIIIIIIIIvvv[kmmlmle]kmmlmle]]^vvv^v^kmmlmle]v^v^Rbe]kmmlmle]kmTRIIIIIIIIvv^^]elmlmm[]elmlmm[svvvvv^^]elmlmm[^v^vblm[]elmlmm[]eeTIIIIIIIIvvv^[melellk[melellkssvvvvv^[melellkssvvRllk[melellk[meRIIIIIIIIvvskklTbTbm]klTbTbm][vvvvvskklTbTbm][vvvRbm]klTbTbm]klTRIIIIIIIIvvv[kmTRRbe]kmTRRbe]]^vvvvv[kmTRRbe]]^vvRbe]kmTRRbe]kmTRIIIIIIIIvv^^]eeTblm[]eeTblm[svvvvv^^]eeTblm[svvvblm[]eeTblm[]eeTIIIIIIIIvvv^[meRRllk[meRRllkssvvvvv^[meRRllkssvvRllk[meRRllk[meRIIIIIIIIvvskklTRTbm]klTRTbm][vvvvvskklTRTbm][vvvRbm]klTRTbm]klTRIIIIIIIIvvv[kmTbTbe]kmTbTbe]]^vvvvv[kmTbTbe]]^vvRbe]kmTbTbe]kmTRIIIIIIIIvv^^]melelm[]melelm[svvvvv^^]melelm[svvvblm[]melelm[]eeTIIIIIIIIvvv^kemememkkemememkssvvvsv^kemememkssvsRllkkemememk[meRIIIIIIIIvvskemememe]emememe][vvvsvskemememe][vsvRbm]emememe]klTRIIIIIIIIvvv[k]k]k]k]k]k]k]k]]^vv^sv[k]k]k]k]]^^sRbe]k]k]k]k]kmTRIIIIIIIIvv^^[][][][][][][][]svvv[][][][][][][][]blm[sv[k[k^^]eeTIIIIIIIIvvv^[[][][]k[[][][]kssvv][][][][][][][][Rllkssk[k[v^[meRIIIIIIIIvvskk]k]k]k]k]k]k]k][vvvk]k]k]k]k]k]k]k]Rbm][v^s^sskklTRIIIIIIIIvvv[kmmlmle]kmmlmle]]^vvmlmlmlmlmlmlmlmlRbe]]^v^v^v[kmTRIIIIIIIIvv^^]elmlmm[]elmlmm[svvvlmlmlmlmlmlmlmlmblm[sv^v^v^^]eeTIIIIIIIIvvv^[melellk[melellkssvvelelelelelelelelRllkssvvvvv^[meRIIIIIIIIvvskklTbTbm]klTbTbm][vvvTbTbTbTbTbTbTbTbRbm][vvvvvskklTRIIIIIIIIvvv[kmTRRbe]kmTRRbe]]^vvRRRRRRRRRRRRRRRRRbe]]^vvvvv[kmTRIIIIIIIIvv^^]eeTblm[]eeTblm[svvvvv^^]eeTblm[svvvblm[]eeTblm[]eeTQSRSRSRKvvv^[meRRllk[meRRllkssvvvvv^[meRRllkssvvRllk[meRRllk[meRRRRRRRRRvvskklTRTbm]klTRTbm][vvvvvskklTRTbm][vvvTbm]klTRTbm]klTRRRTRTRTRvvv[kmTbTbe]kmTbTbe]]^vvvvv[kmTbTbe]]^vvTbe]kmTbTbe]kmTbRbTbTbTRvv^^]melelm[]melelm[svvvvv^^]melelm[svvvelm[]melelm[]melaleleleLvvv^kemememkkemememkssvvvsv^kemememkssvsmemkkemememkkemeIdmemmeIvvskemememe]emememe][vvvsvskemememe][vsveme]emememe]ememIIemelIIvvv[k]k]k]k]k]k]k]k]]^vv^sv[k]k]k]k]]^^sk]k]k]k]k]k]k]k]IIIYKIIIvv^n[k[k[k[k[k[k[k[ksvvv[][][][][][][][][k^n[][][][][s[kIIIIIIIIvvv[k[k[k[k[k[k[k[k[ssvv][]k[[][][]k[[][k[v[[[][][]kssk[IIIIIIIIvv[s^s^s^s^s^s^s^s^s^vvvk]k]k]k]k]k]k]k]^s[sk]k]k]k]^v^sIIIIIIIIvvv^v^v^v^v^v^v^v^v^v^vvmle]kmmlmle]kmmlv^v^kmmlmle]v^v^IIIIIIIIvv^v^v^v^v^v^v^v^v^v^vvvlmm[]elmlmm[]elm^v^v]elmlmm[^v^vIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvellk[melellk[melvvv^[melellkssvvIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvTbm]klTbTbm]klTbvvskklTbTbm][vvvIIIIIIIIvvvvvvvvvvvvvvvvvvvvvvvvRbe]kmTRRbe]kmTRvvv[kmTRRbe]]^vvIIIIIIIIblm[svvvvv^^]eeT@@@@@@@@@@@[[[@@@@X[X[@@[[[C@@@X[X[@@[[[C@@@X[X[Rllkssvvvvv^[meR@@@@@@@@@@[I[IC@@XKYKY@[I[IYC@XKYKY@[I[IYC@XKYKYTbm][vvvvvskklTR@@@@@@@@@XIIIIY@XKYKI[XIIIIICXKYKI[XIIIIICXKYKI[Tbe]]^vvvvv[kmTb@@@@@@@@@KIIIIICKIIIICKIIII[CKIIIICKIIII[CKIIIICelm[svvvvv^^]mel@@@@@@@@@III[[IIIIY@KIIIICXIIIIY@KIIIICXIIIIY@memkssvsvsv[keme@@@@@@@@@IIICXIIIIY@IIICXIIIIY@IIICXIIIIY@eme][vsvsvsk[mem@@@@@@@@@KIIIYCxOIyOY@IIYCxOIyOY@IIYCxOIyOY@k]k]][^s^s^[]]k]@@@@@@@@@KIIIY@xOIyO[@KIIIY@xOIyO[@KIIIY@xOIyO[@[k[k[][][][][k[k@@@@@@@@@KIyIY@XIIIIC@KIIIY@XIIIIC@KIIIY@XIIIIC@k[k[[[][][]kk[k[@@@@@@@@@XKIIC@XIIIIC@XKyOC@XIIIIC@XKyOC@XIIIIC@^s[k[]k]k]k][s^s@@@@@@@@@@XIIC@@[IY@@@XII[@@[IY@@@XII[@@[IY@@v^v[kmmlmle]]^v^@@@@@@@@@@XIIC@@@KIYC@@XIIKC@@KIYC@@XIIKC@@KIYC@^v^^]elmlmm[[v^v@@@@@@@@@@XII[@@XIIYY@@KIIKC@XIIYY@@KIIKC@XIIYY@vvv^[melellkssvv@@@@@@@@@@XIIKC@XyYY@@KII[@@XIIYY@@OI[@@XIIYY@vvskklTbTbm][vvv@@@@@@@@@@@[OC@X{_C@@_{G@@x_[C@@[C@xIyG@vvv[kmTRRbe]]^vv@@@@@@@@@@@_@@x@@@@@@xG@@xG@@@@@@G@x[{G@[C[C@@@X[[[@@[C[C@@@X[[[@@[C[C@@@@[[[@@@@@PBPB@@@PRPBRB@[[C@@@@@KYKYC@XKI[I[@KYKYC@XKI[I[@KYKYC@@XI[I[@@@PRRRRB@@RRRRRR@@C@@@@@@[IYKYCXIIIIIC[IYKYCXIIIIIC[IYKYC@KIIIIC@@RRRRRR@PRRRRRRB@@@@@@@@XIIIIYX[IIIIYXIIIIYX[IIIIYXIIIIYXIIIIIY@PRRRRRRBRRRRRRRR@B@B@B@B@KIIIICXIIIIY@KIIIICXIIIIY@KIIII[[III@PRRVrRRBR@vRRv@RP@P@P@P@@KIIIICXIII@KIIIICXIII@KIIIICXIII@@pvvvvF@@pvvvvF@R@R@R@R@@KyOIyGXKII@KyOIyGXKII@KyOIyGXKIIIY@@pvvvvF@@pvvvvF@RSRSRSRS@[yOIyG@KIIIY@[yOIyG@KIIIY@[yOIyG@KIIIY@@pvvvvF@@pvvvvF@@B@B@B@B@XIIIIC@KIIIY@XIIIIC@KIIIY@XIIIIC@KIOIY@@pvvvvF@@pvvvvF@@P@P@P@P@XIIIIC@XyOYC@XIIIIC@XyOYC@XIIIIC@XIIYC@@@vvvv@@@@vvvv@@BPBPBPBP@@KI[@@[IIC@@@KI[@@[IIC@@@KI[@@XIIC@@@@vvvv@@@@vvvv@@RSRSRSRS@XKIY@@XYIIC@@XKIY@@XYIIC@@XKIY@@@XIIC@@@@vvvv@@@@vvvv@@@@@@@@@@@KKIIC@XYIIY@@KKIIC@XYIIY@@KKIIC@@[IIC@@@@pvvF@@@@pvvF@@B@B@B@B@@KKIIC@@[Iy@@KKIIC@@[IIY@@KKOC@XYIIC@@@@pvvF@@@@pvvF@@B@B@B@B@@xOIG@X[@@X[{G@@x_{@@X{_C@Xy[@@@@@@vv@@@@@@vv@@@RPRPRPRP@x_[G@x@@@@@@xG@@xG@@@@@@G@@{@@@@@@pF@@@@@@pF@@@RSRSRSRS",
  width: 128,
  height: 128,
  colors: "e7f5f907480859412640200050301077542f141414",
});

export const zone00 = {
  carrots: [
    [1, 2],
    [4, 2],
    [6, 2],
    [10, 2],
    [3, 4],
    [8, 4],
    [6, 5],
    [10, 5],
    [1, 6],
    [4, 6],
  ],
  grass: [
    [2, 7],
    [3, 7],
    [5, 7],
    [7, 7],
    [9, 7],
    [10, 7],
  ],
  doors: [],
  columns: 12,
  rows: 9,
  collisionMap: [
    0, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 0, 2, 0, 0, 0, 0, 10, 0, 0, 14, 0, 0, 8, 2,
    0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 8, 0, 3, 0, 0, 13, 4, 7, 0, 0, 0, 13, 0, 0,
    6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0, 0, 1, 0, 0, 0, 0, 11, 0, 0, 8, 2, 0,
    0, 0, 0, 0, 11, 0, 10, 0, 13, 0, 0, 3, 0, 0, 11, 0, 10, 0, 10, 0, 0, 8, 0,
    0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0,
  ],
  graphicalMap: [
    27, 36, 35, 5, 36, 25, 17, 35, 44, 17, 35, 5, 30, 39, 39, 39, 39, 11, 31,
    39, 19, 31, 39, 7, 38, 31, 39, 31, 31, 11, 39, 39, 39, 39, 39, 7, 30, 3, 31,
    39, 4, 23, 6, 31, 31, 39, 4, 14, 22, 21, 39, 31, 31, 39, 31, 39, 31, 39, 31,
    20, 38, 39, 39, 47, 39, 31, 39, 39, 3, 39, 31, 12, 10, 31, 31, 31, 31, 39,
    3, 39, 11, 31, 4, 46, 40, 2, 39, 39, 3, 39, 11, 39, 11, 31, 39, 8, 24, 49,
    2, 3, 37, 27, 23, 13, 11, 12, 13, 8,
  ],
  id: "00",
};

import Check from "../Core/Check.js";

/**
 * A utility for dynamically-generating a GLSL function
 *
 * @alias ShaderFunction
 * @constructor
 *
 * @see {@link ShaderBuilder}
 * @param {String} signature The full signature of the function as it will appear in the shader. Do not include the curly braces.
 * @example
 * // generate the following function
 * //
 * // void assignVaryings(vec3 position)
 * // {
 * //    v_positionEC = (czm_modelView * vec4(a_position, 1.0)).xyz;
 * //    v_texCoord = a_texCoord;
 * // }
 * var signature = "void assignVaryings(vec3 position)";
 * var func = new ShaderFunction(signature);
 * func.addLine("v_positionEC = (czm_modelView * vec4(a_position, 1.0)).xyz;");
 * func.addLine("v_texCoord = a_texCoord;");
 * var generatedLines = func.generateGlslLines();
 *
 * @private
 */
export default function ShaderFunction(signature) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.string("signature", signature);
  //>>includeEnd('debug');
  this.signature = signature;
  this.body = [];
}

/**
 * Add a single line to the body of the function
 * @param {String} lines Line of GLSL code to add to the function body. Do not include any preceding whitespace, but do include the semicolon for each line.
 */
ShaderFunction.prototype.addLines = function (lines) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("line", lines);
  //>>includeEnd('debug');
  var paddedLines = lines.map(function (line) {
    return "    " + line;
  });
  Array.prototype.push.apply(this.body, paddedLines);
};

/**
 * Generate lines of GLSL code for use with {@link ShaderBuilder}
 * @return {String[]}
 */
ShaderFunction.prototype.generateGlslLines = function () {
  return [].concat(this.signature, "{", this.body, "}");
};

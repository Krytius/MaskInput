/**
 * Mask Input
 * @version v.1.0.0
 * @author Elvis Ferreira Coelho
 * 
 * Created by Elvis Ferreira Coelho on 2014-02-05. Please report any bug at http://elviscoelho.net
 * 
 * Copyright (c) 2014 Elvis Ferreira Coelho http://elviscoelho.net
 * 
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * @param {String} mask
 * @param {DON} element
 * @returns {void}
 */
function MaskInput(mask, element) {

    //Globais
    var self = this;
    var mascara = mask;
    var don = element;

    /**
     * Inicia a máscara
     * @return {void}
     */
    var init = function() {
        var regexParcial = createRegexParcial();
        var caracteres = retornoPosicaoCaracteres(regexParcial);
        var retornoValue = verificaElement(regexParcial, caracteres);
    };
    
    /**
     * Cria o regex para cada caractere da máscara
     * @return {void}
     */
    var createRegexParcial = function() {
        var quant = mascara.length;
        don.maxLength = quant;
        var objParcial = [];

        for (var i = 0; i < quant; i++) {
            objParcial.push(createRegex(mascara[i]));
        }

        return objParcial;
    };
    
    /**
     * Função que retorna a posição de cada caractere especial para preenchimento
     * @param {Regex} regex Expressão Regular para testar caracteres especiais 
     */
    var retornoPosicaoCaracteres = function(regex) {
        var quant = regex.length;
        var objParcial = [];

        for (var i = 0; i < quant; i++) {
            if (!regex[i].test(1) && !regex[i].test("A") && !regex[i].test("a")) {
                objParcial.push({
                    pos: i,
                    char: mascara[i]
                });
            }
        }

        return objParcial;
    };
    
    /**
     * Função que aplica as regras para a máscara
     * @param {Array} regexParcial array de expressões regulares
     * @param {Array} caracteres array de caracteres especiais
     */
    var verificaElement = function(regexParcial, caracteres) {
        var value = don.value;
        var valor = don.value;
        var quantDon = valor.length;
        var quantRegex = regexParcial.length;
        var quantCarat = caracteres.length;

        for (var i = 0; i < quantDon; i++) {
            for (var k = 0; k < quantCarat; k++) {
                if (i === caracteres[k].pos) {
                    if (valor[i] !== caracteres[k].char) {
                        value = trocaPosicao(caracteres[k].pos, value, caracteres[k].char);
                    }
                }
            }
        }
        
        for(var i =0; i < value.length; i++) {
            var teste = regexParcial[i].test(value[i]);
            
            if(!teste) {
                value = removeCaractere(i, value);
            }
        }
        
        don.value = value;
    };
    
    /**
     * Função que remove o caractere do value
     * @param {interger} pos posição para ser removida
     */
    var removeCaractere = function(pos, valor) {
        valor =  valor.slice(0, pos);
        return valor;
    };
    
    /**
     * Troca posição do objeto
     * @param {interger} pos posição para troca
     * @param {String} valor valor inicial
     * @param {String} char argumento a ser trocado na posição
     */
    var trocaPosicao = function(pos, valor, char) {
        return (valor.slice(0, pos) + char + valor.slice(pos));
    };

    /**
     * Função que retorna regex
     * @param {String} mask
     * @returns {String}
     */
    var createRegex = function(mask) {
        var quant = mask.length;

        var indice = "";
        var contador = 1;
        var regex = "";
        for (var i = 0; i < quant; i++) {
            if (indice === mask[i]) {
                contador++;
            } else {

                if (contador > 1) {
                    regex += "{" + contador + "})";
                } else if (contador === 1 && (indice === "A" || indice === "a" || indice === "?" || indice === "9")) {
                    regex += ")";
                } else if (contador === 1 && indice === "*") {
                    regex += "+)";
                }

                indice = mask[i];

                if (indice === "9")
                    regex += "([0-9]";
                else if (indice === "A")
                    regex += "([A-Z]";
                else if (indice === "a")
                    regex += "([a-z]";
                else if (indice === "?")
                    regex += "([A-Za-z]";
                else if (indice === "*")
                    regex += "([A-Za-z0-9]";
                else if (indice === " ")
                    regex += "\\s";
                else
                    regex += "\\" + indice;

                contador = 1;
            }

            if (i === quant - 1 && contador > 1) {
                regex += "{" + contador + "})";
            } else if (i === quant - 1 && (indice === "A" || indice === "a" || indice === "?" || indice === "9") && contador === 1) {
                regex += ")";
            } else if (i === quant - 1 && contador === 1 && indice === "*") {
                regex += "+)";
            }
        }

        return new RegExp("^" + regex + "$");
    };
    
    // Coloca a máscara no elemento
    init();
};
// Grammar for Stellaris Tech Files

Object "object"
  = s:Statement+ {
    
    let o = {};

    // For each object property
    for(let { op, key, value } of s.filter(x => x != undefined )) {

      // Operators
      if (op == ">") {
        value = { greaterThan: value };
      }

      let isArray = Array.isArray(o[key]);
      let exists = key in o;

      // 
      if( exists && isArray ) {
        o[key].push(value);
      } else if(exists && !isArray) {
        o[key] = [o[key], value];
      } else {
        o[key] = value;
      }
    }
    
    return o;
  }

Statement "statement"
  = _ s:( Comment / Property / EOL ) _ {
    return s;
  }

Property
  = key:Identifier _ op:Operator _ value:Value {
    return { op, key, value }
  }

Operator
  = "=" / ">"

Value "value"
  = _ val:( Map / Array / Boolean / String / Number / Identifier ) _ {
    return val;
  }

Map "map"
  = "{" obj:Object "}" {
    return obj
  }

Array "array"
   = "{" arr:Value+ "}" {
     return arr;
   }

Comment "comment"
	= "#" body:( !EOS . )* EOS { }

Identifier
  = value: Constant
  / value: Word

Constant "constant"
	= "@" word:Word { return text(); }

Boolean "boolean"
  = "yes" { return true }
  / "no" { return false }

Word "word"
	= [A-Za-z_][A-Za-z0-9_]* { return text(); }

String
  = '"' quote: NotQuote* '"' { return quote.join("") }

NotQuote
  = !'"' char: . { return char }

Number "number"
  = [0-9]+ "." [0-9]+ { return parseFloat(text()); }
  / [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]* { return ' ' }

__ "forced whitespace"
  = [ \t\n\r]+ { return ' ' }

EOS "EOS"
  = EOL
  / EOF

EOL "EOL"
  = "\r\n" { }
  / "\n" { }

EOF "EOF"
  = !. { }

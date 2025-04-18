
import { encoding_for_model, TiktokenModel } from "tiktoken"


export const generateToken = (model:TiktokenModel,text: string) => {
    const encoding = encoding_for_model(model);
    const tokens = encoding.encode(text);
    encoding.free();
    return tokens;
}

export const convertToString = (model:TiktokenModel,tokens:Uint32Array) => {
    const encoding = encoding_for_model(model);
    const decodedString = encoding.decode(tokens);
    encoding.free();
    return decodedString;
}


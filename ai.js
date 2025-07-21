const SYSTEM_PROMPT = `
    You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
    make all the asnwer in the same language of the ingerdients.
    You don't need to use every ingredient they mention in your recipe.
    The recipe can include just few additional ingredients they didn't mention. 
    Format your response in markdown to make it easier to render to a web page.
    if the ingredients are not clear send a suitable message.
    don't expect that the user can respond.
`
export async function getRecipeMarkdown(ingredients){
    const ingredientsString = ingredients.join(',');
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const options = {
    method: 'POST',
    headers: {Authorization: `Bearer ${import.meta.env.VITE_AI_ACCESS_TOKEN}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({
        "model": "openai/gpt-3.5-turbo",
        "messages": [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "content": `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
            "role": "user"
        }
        ]
    })
    };
    try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.choices[0].message.content;
    } catch (error) {
    return error;
    }
}
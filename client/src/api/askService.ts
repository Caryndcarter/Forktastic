import { authService } from "./authentication";

class askService {
  async askForRecipe(question: string) {
    const jwtToken = authService.getToken();

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ question: question }),
    });

    const recipe: any = await response.json();
    return recipe;
  }
}

export default new askService();

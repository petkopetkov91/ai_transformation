import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `Вие сте AI асистент за дигитална трансформация. Отговаряйте на български език и помагайте с:
    - Стратегии за дигитална трансформация
    - Управление на проекти и инициативи
    - Анализ на процеси и оптимизация
    - Препоръки за технологии
    - Планиране и изпълнение на промени
    
    ${context ? `Контекст: ${context}` : ''}
    
    Бъдете професионални, полезни и конкретни в отговорите си.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "Съжалявам, не мога да генерирам отговор в момента.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Възникна грешка при генериране на отговор. Моля, опитайте отново.";
  }
}

export async function generateMeetingSummary(notes: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Вие сте AI асистент, който генерира резюмета на срещи на български език. Създайте структурирано резюме с ключови точки, решения и следващи стъпки."
        },
        {
          role: "user",
          content: `Моля, генерирайте резюме на тази среща:\n\n${notes}`
        }
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    return response.choices[0].message.content || "Не може да се генерира резюме.";
  } catch (error) {
    console.error("Meeting summary error:", error);
    return "Грешка при генериране на резюме на срещата.";
  }
}

export async function analyzeDocument(content: string, filename: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Вие сте AI анализатор на документи. Анализирайте документа и предоставете резюме, ключови точки и препоръки на български език."
        },
        {
          role: "user",
          content: `Анализирайте този документ "${filename}":\n\n${content}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "Не може да се анализира документът.";
  } catch (error) {
    console.error("Document analysis error:", error);
    return "Грешка при анализ на документа.";
  }
}

export async function generateActionItems(meetingNotes: string): Promise<Array<{
  title: string;
  description: string;
  priority: string;
  assignee?: string;
}>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Извлечете действия от бележките за срещата и върнете ги като JSON масив. Отговорете в JSON формат с полета:
          {
            "actions": [
              {
                "title": "заглавие на действието",
                "description": "описание на действието", 
                "priority": "high|medium|low",
                "assignee": "отговорник (ако е споменат)"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Извлечете действия от тези бележки:\n\n${meetingNotes}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.actions || [];
  } catch (error) {
    console.error("Action items generation error:", error);
    return [];
  }
}

export async function generateProgressInsights(initiatives: any[]): Promise<string> {
  try {
    const initiativesText = initiatives.map(init => 
      `${init.title}: ${init.progress}% (${init.status}, приоритет: ${init.priority})`
    ).join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Анализирайте прогреса на инициативите и предоставете прозрения, препоръки и следващи стъпки на български език."
        },
        {
          role: "user",
          content: `Анализирайте този прогрес на инициативи:\n\n${initiativesText}`
        }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return response.choices[0].message.content || "Не може да се генерират прозрения за прогреса.";
  } catch (error) {
    console.error("Progress insights error:", error);
    return "Грешка при анализ на прогреса.";
  }
}

// kuderClassifier.ts

// Definición de interfaces
export interface Question {
  question: string;
  options: string[];
  helpText: string;
}

export interface KuderResponse {
  questionIndex: number;
  selectedOptionIndex: number; // Índice de la opción seleccionada
}

// Clase para manejar el cuestionario de Kuder
export class KuderQuestionnaire {
  private questions: Question[];

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  public getQuestions(): Question[] {
    return this.questions;
  }
}

// Clase para clasificar las respuestas del cuestionario
export class KuderClassifier {
  private responses: KuderResponse[];

  constructor(responses: KuderResponse[]) {
    this.responses = responses;
  }

  public classify(): string {
    const preferences = this.calculatePreferences();
    return this.determineVocationalOrientation(preferences);
  }

  // Método para calcular las preferencias según las respuestas
  private calculatePreferences(): number[] {
    const scores = [0, 0, 0]; // Índices para los tipos: Creativo, Práctico, Teórico

    this.responses.forEach((response) => {
      const { selectedOptionIndex } = response;

      // Asignar puntajes basados en la opción seleccionada
      switch (selectedOptionIndex) {
        case 0: // Preferencia por actividades creativas
          scores[0]++;
          break;
        case 1: // Preferencia por actividades prácticas
          scores[1]++;
          break;
        case 2: // Preferencia por actividades teóricas
          scores[2]++;
          break;
      }
    });

    return scores;
  }

  // Método para determinar la orientación vocacional en base a las preferencias
  private determineVocationalOrientation(scores: number[]): string {
    const maxScore = Math.max(...scores);
    const orientation = scores.indexOf(maxScore);

    switch (orientation) {
      case 0:
        return 'Creativo';
      case 1:
        return 'Práctico';
      case 2:
        return 'Teórico';
      default:
        return 'Sin orientación clara';
    }
  }
}

  
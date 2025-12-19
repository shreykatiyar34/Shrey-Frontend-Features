import apiClient from './api';

export interface Board {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

export interface Medium {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

export interface Class {
  id: number;
  name: string;
  board_id: number;
  created_at: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  class_id: number;
  created_at: string;
}

class ContentService {
  /**
   * Get all boards
   * GET /api/v1/content/boards
   */
  async getBoards(): Promise<Board[]> {
    try {
      const response = await apiClient.get('/content/boards');
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from boards API');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch boards:', error);
      if (error.response?.status === 500) {
        throw new Error('Internal server error');
      }
      throw new Error(`Failed to fetch boards: ${error.message}`);
    }
  }

  /**
   * Get all mediums
   * GET /api/v1/content/mediums
   */
  async getMediums(): Promise<Medium[]> {
    try {
      const response = await apiClient.get('/content/mediums');
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from mediums API');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch mediums:', error);
      if (error.response?.status === 500) {
        throw new Error('Internal server error');
      }
      throw new Error(`Failed to fetch mediums: ${error.message}`);
    }
  }

  /**
   * Get classes for a specific board and medium combination
   * GET /api/v1/content/classes?board_name={boardName}&medium_name={mediumName}
   * @param boardName - Name of the board (e.g., "CBSE")
   * @param mediumName - Name of the medium (e.g., "English")
   */
  async getClasses(boardName: string, mediumName: string): Promise<Class[]> {
    if (!boardName || !mediumName) {
      throw new Error('Board name and medium name are required');
    }

    try {
      const response = await apiClient.get('/content/classes', {
        params: {
          board_name: boardName,
          medium_name: mediumName,
        },
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from classes API');
      }

      // Empty array is valid - means no classes found for this combination
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch classes:', error);
      if (error.response?.status === 422) {
        throw new Error('Board name and medium name are required');
      }
      if (error.response?.status === 500) {
        throw new Error('Internal server error');
      }
      throw new Error(`Failed to fetch classes: ${error.message}`);
    }
  }

  /**
   * Get all subjects for a specific board, medium, and class combination
   * GET /api/v1/content/subjects?board_name={boardName}&medium_name={mediumName}&class_name={className}
   * @param boardName - Name of the board (e.g., "CBSE")
   * @param mediumName - Name of the medium (e.g., "English")
   * @param className - Name of the class (e.g., "Class 10")
   */
  async getSubjects(boardName: string, mediumName: string, className: string): Promise<Subject[]> {
    if (!boardName || !mediumName || !className) {
      throw new Error('Board name, medium name, and class name are required');
    }

    try {
      const response = await apiClient.get('/content/subjects', {
        params: {
          board_name: boardName,
          medium_name: mediumName,
          class_name: className,
        },
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from subjects API');
      }

      // Empty array is valid - means no subjects found for this combination
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch subjects:', error);
      if (error.response?.status === 422) {
        throw new Error('Board name, medium name, and class name are required');
      }
      if (error.response?.status === 500) {
        throw new Error('Internal server error');
      }
      throw new Error(`Failed to fetch subjects: ${error.message}`);
    }
  }
}

export default new ContentService();


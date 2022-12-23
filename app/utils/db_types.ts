export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      gerbang: {
        Row: {
          id: string
          name: string | null
          created_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          name?: string | null
          created_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          name?: string | null
          created_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

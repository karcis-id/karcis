export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          creator_user_id: string
          event_datetime: string
          event_id: number
          is_verified: boolean
          location: string
          name: string
        }
        Insert: {
          created_at?: string
          creator_user_id: string
          event_datetime?: string
          event_id?: number
          is_verified?: boolean
          location?: string
          name?: string
        }
        Update: {
          created_at?: string
          creator_user_id?: string
          event_datetime?: string
          event_id?: number
          is_verified?: boolean
          location?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_creator_user_id_fkey"
            columns: ["creator_user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      participants: {
        Row: {
          checked_in_at: string | null
          created_at: string
          email: string
          event_id: number
          is_checked_in: boolean
          name: string
          participant_id: number
        }
        Insert: {
          checked_in_at?: string | null
          created_at?: string
          email?: string
          event_id: number
          is_checked_in?: boolean
          name?: string
          participant_id?: number
        }
        Update: {
          checked_in_at?: string | null
          created_at?: string
          email?: string
          event_id?: number
          is_checked_in?: boolean
          name?: string
          participant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "participants_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

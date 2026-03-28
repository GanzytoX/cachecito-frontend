import type { Chat, Message } from "./types"

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "María López",
    initials: "ML",
    lastMessage: "¿Ya viste lo del proyecto? 🚀",
    time: "Ahora",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    initials: "CR",
    lastMessage: "Te envié el archivo que pediste",
    time: "12:34",
    unread: 1,
    online: true,
  },
  {
    id: "3",
    name: "Ana García",
    initials: "AG",
    lastMessage: "Perfecto, nos vemos mañana entonces",
    time: "11:20",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Pedro Sánchez",
    initials: "PS",
    lastMessage: "Gracias por la ayuda 🙏",
    time: "Ayer",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Laura Méndez",
    initials: "LM",
    lastMessage: "¿A qué hora es la junta?",
    time: "Ayer",
    unread: 0,
    online: true,
  },
  {
    id: "6",
    name: "Diego Torres",
    initials: "DT",
    lastMessage: "Listo, ya quedó el deploy",
    time: "Lun",
    unread: 0,
    online: false,
  },
  {
    id: "7",
    name: "Sofía Herrera",
    initials: "SH",
    lastMessage: "Jajaja buenísimo 😂",
    time: "Lun",
    unread: 0,
    online: false,
  },
  {
    id: "8",
    name: "Grupo Frontend",
    initials: "GF",
    lastMessage: "Diego: Revisé el PR, se ve bien",
    time: "Dom",
    unread: 0,
    online: false,
  },
]

export const mockMessages: Message[] = [
  // Chat 1 — María López
  { id: "m1-1", chatId: "1", text: "Hola! ¿Cómo vas con el proyecto?", time: "10:20", fromMe: false },
  { id: "m1-2", chatId: "1", text: "Bien, ya casi termino el módulo de pagos", time: "10:22", fromMe: true },
  { id: "m1-3", chatId: "1", text: "Excelente, necesito que lo revisemos juntos antes del viernes", time: "10:23", fromMe: false },
  { id: "m1-4", chatId: "1", text: "Claro, ¿te parece el jueves a las 3?", time: "10:25", fromMe: true },
  { id: "m1-5", chatId: "1", text: "Perfecto, ahí nos vemos", time: "10:26", fromMe: false },
  { id: "m1-6", chatId: "1", text: "Oye y otra cosa...", time: "10:30", fromMe: false },
  { id: "m1-7", chatId: "1", text: "¿Ya viste lo del proyecto? 🚀", time: "10:31", fromMe: false },

  // Chat 2 — Carlos Ruiz
  { id: "m2-1", chatId: "2", text: "¿Me puedes pasar el archivo del diseño?", time: "12:10", fromMe: true },
  { id: "m2-2", chatId: "2", text: "Sí, dame un momento", time: "12:15", fromMe: false },
  { id: "m2-3", chatId: "2", text: "Aquí va 📎", time: "12:30", fromMe: false },
  { id: "m2-4", chatId: "2", text: "Te envié el archivo que pediste", time: "12:34", fromMe: false },

  // Chat 3 — Ana García
  { id: "m3-1", chatId: "3", text: "¿Nos juntamos mañana para planear la sprint?", time: "11:00", fromMe: true },
  { id: "m3-2", chatId: "3", text: "Sí, prefiero en la mañana", time: "11:05", fromMe: false },
  { id: "m3-3", chatId: "3", text: "¿A las 9 está bien?", time: "11:10", fromMe: true },
  { id: "m3-4", chatId: "3", text: "Perfecto, nos vemos mañana entonces", time: "11:20", fromMe: false },

  // Chat 4 — Pedro Sánchez
  { id: "m4-1", chatId: "4", text: "Oye Pedro, ¿tienes el contacto del proveedor?", time: "09:00", fromMe: true },
  { id: "m4-2", chatId: "4", text: "Sí, te lo paso por aquí: +52 55 1234 5678", time: "09:15", fromMe: false },
  { id: "m4-3", chatId: "4", text: "Gracias por la ayuda 🙏", time: "09:16", fromMe: false },

  // Chat 5 — Laura Méndez
  { id: "m5-1", chatId: "5", text: "Laura, ¿sabes a qué hora es la junta de mañana?", time: "15:00", fromMe: false },
  { id: "m5-2", chatId: "5", text: "Creo que a las 10, déjame confirmar", time: "15:05", fromMe: true },
  { id: "m5-3", chatId: "5", text: "¿A qué hora es la junta?", time: "15:30", fromMe: false },

  // Chat 6 — Diego Torres
  { id: "m6-1", chatId: "6", text: "¿Ya subiste los cambios al staging?", time: "14:00", fromMe: true },
  { id: "m6-2", chatId: "6", text: "Estoy en eso, unos minutos más", time: "14:10", fromMe: false },
  { id: "m6-3", chatId: "6", text: "Listo, ya quedó el deploy", time: "14:45", fromMe: false },
]

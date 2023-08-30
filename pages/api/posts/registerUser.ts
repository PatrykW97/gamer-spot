import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import argon2 from 'argon2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, nickname, email, password } = req.body.data;
    console.log(req.body.data)
    try {
      // Sprawdź, czy istnieje użytkownik o takim samym emailu lub nazwie użytkownika
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { name }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Użytkownik o takim emailu lub nazwie użytkownika już istnieje' });
      }

      // Hashuj hasło przed zapisaniem w bazie danych
      const hashedPassword = await argon2.hash(password);

      // Stwórz nowego użytkownika w bazie danych
      const newUser = await prisma.user.create({
        data: {
            nickname,
            name,
            email,
            hashedPassword,
             // Używamy zahashowanego hasła
            // Możesz dodać dodatkowe pola, jeśli są potrzebne
        },
      });

      return res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
    } catch (error) {
      console.error('Błąd w obsłudze rejestracji:', error);
      return res.status(500).json({ error: 'Wystąpił błąd podczas rejestracji' });
    }
  } else {
    return res.status(405).json({ error: 'Metoda nieobsługiwana' });
  }
}
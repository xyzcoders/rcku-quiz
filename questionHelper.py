import sqlite3

conn = sqlite3.connect("example_copy1.sqlite")
cur = conn.cursor()

cat_exists = input("Kierunek już istnieje? [t/n]")
cat_short_name = ""
if cat_exists == "t":
  cat_short_name = input("Podaj skróconą nazwę kierunku: ")
else:
  cat_full_name = input("Podaj pełną nazwę kierunku: ")
  cat_short_name = input("Podaj skróconą nazwę kierunku: ")
  cur.execute("INSERT INTO fields VALUES (NULL, ?, ?)", (cat_short_name, cat_full_name))
  conn.commit()  
while True:
  question_name = input("Podaj treść pytania: ")
  cur.execute("INSERT INTO questions VALUES (NULL, ?, ?)", (question_name, cat_short_name))
  conn.commit()  
  question_id = cur.lastrowid
  
  answer_count = int(input("Podaj ilość odpowiedzi: "))
  answers = list()

  for i in range(answer_count):
    answer = input(f"Podaj treść odpowiedzi {i+1}: ")
    is_correct = 1 if input("Jest prawidłowa? [t/n]: ") == "t" else 0
    answers.append((answer, is_correct, question_id))
  cur.executemany("INSERT INTO answers VALUES (NULL, ?, ?, ?)", answers)
  conn.commit()  
  next_question = input("Kolejne pytanie? [t/n]: ")
  if next_question == "t":
    continue
  else:
    break


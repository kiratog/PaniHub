export interface Category{
  name:string;
  query:string;
}

export const categories: Category[] = [
  { name: "All", query: "Phisics explained" },
  { name: "Science", query: "science explained" },
  { name: "Computer Science", query: "computer science tutorial" },
  { name: "AI", query: "artificial intelligence" },
  { name: "ML", query: "machine learning fundamentals" },
  { name: "Maths", query: "mathematics visualization" },
  { name: "Physics", query: "physics deep dive" },
  { name: "Philosophy", query: "stoicism philosophy" },
  { name: "Calculus", query: "calculus 3blue1brown" },
  { name: "Algebra", query: "linear algebra basics" },
  { name: "Drawing", query: "digital art tutorial" },
  {name: "Python", query:"Python (tutorials OR projects OR lectures OR problems)"},
  {name: "JavaScript", query:"Javasscript (tutorials OR projects OR lectures OR problems)"}
];

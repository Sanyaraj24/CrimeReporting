/**USER TABLE**/
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,                
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  photo_url TEXT,
  location TEXT,
  pincode TEXT,
);
/*
is_verified INTEGER DEFAULT 0,      
  join_date TEXT DEFAULT CURRENT_TIMESTAMP,
  reports_count INTEGER DEFAULT 0,    
  active_cases INTEGER DEFAULT 0,
  solved_cases INTEGER DEFAULT 0,
  report_accuracy REAL DEFAULT 0.0 **/


 
ALTER TABLE users 
DROP COLUMN is_verified,
DROP COLUMN join_date,
DROP COLUMN reports_count,
DROP COLUMN active_cases,
DROP COLUMN solved_cases,
DROP COLUMN report_accuracy;
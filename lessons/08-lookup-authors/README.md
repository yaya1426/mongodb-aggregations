# Lesson 08: Lookup Authors

## Problem

The book collection stores author IDs, but the website needs to show author names on each book card.

This requires combining data from two collections.

## Concepts

- `$lookup`
- Local and foreign fields
- Joining arrays of IDs
- Reshaping joined documents with `$map`

## Collections Used

- `books`
- `authors`

## Teaching Goal

Students should understand that `$lookup` lets one aggregation pipeline read related documents from another collection.

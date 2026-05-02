# Lesson 07: Grouping Stats

## Problem

The website wants a genre summary page:

- How many books are in each genre?
- What is the average price?
- How many total copies are in stock?

This is where aggregation becomes clearly different from the Query API.

## Concepts

- `$group`
- `$sum`
- `$avg`
- `$round`
- Group keys

## Collections Used

- `books`

## Teaching Goal

Students should understand that `$group` changes the level of detail from individual documents to summary rows.

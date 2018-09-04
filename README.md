Pixel notes:

baseline pixel (npc, icons, trees, etc)
40x40

Base
H: 680
W: 1680

Level
H: 800
W: 800

PlayerHome
H: 160
W: 160

NPCBuildings
H: 120
W: 120

---------------------------------------

player levels and exp required:
- 1: 100
- 2: 500
- 3: 1000
- 4: 2500
- 5: 5000
- 6: 7500
- 7: 10000
- 8: 12500


---------------------------------------
Notes: 
artwork - town - Hyptosis
character - ansimuz

sprite creation:
- each square should consist of 40x40 pixels

Goal:  
- To create an open-world zombie survival game with rpg elements
- Money system to promote grinding

Tech:
- React Native with Expo for mobile deployment
- Context API to maintain state and data throughout components
- save file to persist data

Gameplay mechanics:
- Field
  - along with character, there will be a random # of zombies with random movements
  - Battle starts when character and zombie collides
  - This means we have to cache the field and position and restore when battle is over
- Battle
  - Large picture of zombie on-Screen
  - displays user and monster health
  - Options: Attack, Defend, Item, Skill, Run away
- Death
  - Lose all gold/items on hand and a random equipment
- 

RPG elements:
- All equipment/items adhere to a level-based concept, with increasing effects/cost per level
  - Equipment system
    - equipments will require certain min levels
  - Consumable items
    - various health items
- Leveling
- Attack Skills
  - small skill tree unlocked based on levels and purchased and lvl with coin
- Money/Coin
  - earned from completing quests and killing monsters
- Quests
  - include areas of increasing difficulty and randomized monster encounters
- treasure boxes
- Bosses between certain stages

Leveling:
- auto stat increase
- unlockable skills depending on level
- no magic for now

Unlockable Features:
- Merchant to buy items
  - All items should be available right off the bat
- Smith to buy equipments
  - All items should be available right off the bat
- Cleric for healing
  - All healing items available right off the bat
- Bank for withdraw/deposit
  - withdrawal fee of 5%

Money/Coin pit:
- Hirelings of increasing levels to gather items/coins
- Purchase land for additional buildings/unlockables features
- House build + upgrade to increase population limit and taxation
- Lose 100% of coin on Death
  - The monsters have defeated you.  Good thing they are only interested in coin.  You are penniless, but you're alive

---------------------------------------------

TODOS:
- refactor CharacterModel to specify actions for npc and player (it's probably just the worldMap modal)
- in higher levels, zombies within 2/3 spaces will start coming at you
- when a modal appears, player movement should not work (likely have something in provider to indicate then have something in character modal to check props)
- refactor number of setStates if appropriate to avoid multiple shouldComponentUpdates
- if all four movement directions are 0 (character is stuck), move character two steps down
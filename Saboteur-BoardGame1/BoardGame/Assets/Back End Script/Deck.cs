﻿//add this to deck gameObject
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Deck : MonoBehaviour
{
    public GameObject CardPrefab;
    public List<GameObject> deck;
    public List<GameObject> containter;

    private void Awake()
    {
        GenerateDeck(10);
        
    }
    void Start()
    {
        shuffle();
    }
    void GenerateDeck(int numberPlayer)
    {
        //generated all needed card
        for (int i = 1; i < 11; ++i)
        {
            SpawnMultipleCard(i, 1);
            if (i < 8)
            {
                SpawnMultipleCard(i + 10, 5);
            }
        }
        
        SpawnMultipleCard(18, 2);
        SpawnMultipleCard(19, 3);
        SpawnMultipleCard(20, 2);
        SpawnMultipleCard(21, 3);
        SpawnMultipleCard(22, 2);
        SpawnMultipleCard(23, 3);
        SpawnMultipleCard(24, 3);
        SpawnMultipleCard(25, 1);
        SpawnMultipleCard(26, 1);
        SpawnMultipleCard(27, 1);
        SpawnMultipleCard(28, 3);

    }

    void SpawnCard(int id)
    {
        
        GameObject cardObj = Instantiate(CardPrefab) as GameObject; 
        cardObj.transform.SetParent(transform);
        Card cardScript = cardObj.GetComponent<Card>();
        cardScript.InitThisCard(id);
        cardObj.transform.SetParent(this.transform.parent);
        deck.Add(cardObj);
        
    }

    void SpawnMultipleCard(int id, int amount)
    {
        for(int i = 0; i < amount; i++)
        {
            SpawnCard(id);
            
        }
    }

    void shuffle()
    {
        for(int i =0; i < deck.Count; i++)
        {
            containter[0] = deck[i];
            int randomIndex = Random.Range(i, deck.Count);
            deck[i] = deck[randomIndex];
            deck[randomIndex] = containter[0];
        }
    }

    public void Deal( PlayerController target, bool gameStarted)
    {
        int UpperCardIndex = deck.Count - 1;
        if (gameStarted)
            deck[UpperCardIndex].GetComponent<Renderer>().enabled = false;
        else//
            deck[UpperCardIndex].transform.SetParent(target.transform);// Later on will not target transform of player but a placeHolder object for card(need to be changed) 

        target.hand.Add(deck[UpperCardIndex]);
        deck.RemoveAt(UpperCardIndex);
    }
}

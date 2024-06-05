using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;
using SimpleJSON;

public class RESTAPI : MonoBehaviour
{
    private string url = "https://665ea1c21e9017dc16f0b5c4.mockapi.io/game";
    public Text puntos;
    public Text nombre;
    public Text company;

    public int id;

    void Start()
    {
        StartCoroutine(GetRequest());
    }

    IEnumerator GetRequest()
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
        {
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.ConnectionError || webRequest.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.Log(": Error: " + webRequest.error);
            }
            else
            {
                string json = webRequest.downloadHandler.text;
                Debug.Log("Received JSON: " + json); // Print the received JSON to the console

                JSONNode data = JSON.Parse(json);
                for (int i = 0; i < data.Count; i++)
                {
                    if (data[i]["id"].Value == id.ToString())
                    {
                        nombre.text = data[i]["Nombre"];
                        company.text = data[i]["Empresa"];
                        puntos.text = data[i]["Puntos"].ToString();
                        Debug.Log("Found object with id " + id + ": " + data[i].ToString());
                        Debug.Log("Found object with id " + id + ": " + data[i]); // Print the object with the matching id
                        break;
                    }
                }
            }
        }
    }
}
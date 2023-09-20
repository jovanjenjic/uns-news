
    export const articles = [
      {
        "id": 1,
        "title": "Primer članka 1",
        "slug": "primer-clanka-1",
        "author": {
          "id": 1,
          "name": "Marko Marković",
          "slug": "marko-markovic",
          "role": "Novinar"
        },
        "content": "Ovo je primer sadržaja članka 1...",
        "category": {
          "id": 1,
          "title": "Nauka",
          "slug": "nauka",
          "description": "Članci o naučnim temama"
        },
        "description": "Opis članka 1",
        "published_at": "2023-09-18T12:00:00Z",
        "created_at": "2023-09-18T10:00:00Z",
        "updated_at": "2023-09-18T10:30:00Z",
        "cover": {
          "id": 1,
          "name": "Cover 1",
          "alternativeText": "Cover slika 1",
          "caption": "Slika za članak 1",
          "width": 800,
          "height": 600,
          "formats": {
            "thumbnail": {
              "name": "thumbnail",
              "hash": "thumbnail_hash",
              "ext": "jpg",
              "mime": "image/jpeg",
              "width": 200,
              "height": 150,
              "size": 12345,
              "url": "https://example.com/thumbnail.jpg"
            }
          },
          "hash": "cover_hash",
          "ext": "jpg",
          "mime": "image/jpeg",
          "size": 654321,
          "url": "https://example.com/cover.jpg"
        }
      },
      {
        "id": 2,
        "title": "Primer članka 2",
        "slug": "primer-clanka-2",
        "author": {
          "id": 2,
          "name": "Ana Anić",
          "slug": "ana-anic",
          "role": "Novinarka"
        },
        "content": "Ovo je primer sadržaja članka 2...",
        "category": {
          "id": 2,
          "title": "Tehnologija",
          "slug": "tehnologija",
          "description": "Članci o tehnološkim temama"
        },
        "description": "Opis članka 2",
        "published_at": "2023-09-19T14:00:00Z",
        "created_at": "2023-09-19T13:00:00Z",
        "updated_at": "2023-09-19T13:30:00Z",
        "cover": {
          "id": 2,
          "name": "Cover 2",
          "alternativeText": "Cover slika 2",
          "caption": "Slika za članak 2",
          "width": 1200,
          "height": 900,
          "formats": {
            "thumbnail": {
              "name": "thumbnail",
              "hash": "thumbnail_hash",
              "ext": "jpg",
              "mime": "image/jpeg",
              "width": 300,
              "height": 225,
              "size": 23456,
              "url": "https://example.com/thumbnail2.jpg"
            }
          },
          "hash": "cover_hash_2",
          "ext": "jpg",
          "mime": "image/jpeg",
          "size": 765432,
          "url": "https://example.com/cover2.jpg"
        }
      }
    ]

  
    export const categories = [
      {
        "id": 1,
        "title": "Nauka",
        "slug": "nauka",
        "description": "Članci o naučnim temama",
        "published_at": "2023-09-17T10:00:00Z",
        "created_at": "2023-09-17T10:00:00Z",
        "updated_at": "2023-09-17T10:00:00Z",
        "cover": {
          "id": 1,
          "name": "Cover Nauka",
          "alternativeText": "Cover slika za Nauka kategoriju",
          "caption": "Slika za Nauka kategoriju",
          "width": 800,
          "height": 600,
          "formats": {
            "thumbnail": {
              "name": "thumbnail",
              "hash": "thumbnail_hash_nauka",
              "ext": "jpg",
              "mime": "image/jpeg",
              "width": 200,
              "height": 150,
              "size": 12345,
              "url": "https://example.com/thumbnail_nauka.jpg"
            }
          },
          "hash": "cover_hash_nauka",
          "ext": "jpg",
          "mime": "image/jpeg",
          "size": 654321,
          "url": "https://example.com/cover_nauka.jpg"
        }
      },
      {
        "id": 2,
        "title": "Tehnologija",
        "slug": "tehnologija",
        "description": "Članci o tehnološkim temama",
        "published_at": "2023-09-18T11:00:00Z",
        "created_at": "2023-09-18T11:00:00Z",
        "updated_at": "2023-09-18T11:00:00Z",
        "cover": {
          "id": 2,
          "name": "Cover Tehnologija",
          "alternativeText": "Cover slika za Tehnologija kategoriju",
          "caption": "Slika za Tehnologija kategoriju",
          "width": 1200,
          "height": 900,
          "formats": {
            "thumbnail": {
              "name": "thumbnail",
              "hash": "thumbnail_hash_tehnologija",
              "ext": "jpg",
              "mime": "image/jpeg",
              "width": 300,
              "height": 225,
              "size": 23456,
              "url": "https://example.com/thumbnail_tehnologija.jpg"
            }
          },
          "hash": "cover_hash_tehnologija",
          "ext": "jpg",
          "mime": "image/jpeg",
          "size": 765432,
          "url": "https://example.com/cover_tehnologija.jpg"
        }
      }
    ]
  
    
      export const contributors = [
        {
          "id": 1,
          "name": "Marko Marković",
          "slug": "marko-markovic",
          "role": "Novinar",
          "published_at": "2023-09-17T10:00:00Z",
          "created_at": "2023-09-17T10:00:00Z",
          "updated_at": "2023-09-17T10:00:00Z",
          "urls": {
            "id": 1,
            "twitter": "marko_markovic",
            "instagram": "marko.markovic",
            "facebook": "marko.markovic",
            "linkedin": "marko-markovic"
          },
          "featured": {
            "id": 1,
            "description": "Marko Marković - Novinar",
            "profile_image": {
              "id": 1,
              "name": "Profile Image Marko",
              "alternativeText": "Profilna slika Marko",
              "caption": "Profilna slika za Marko Marković",
              "width": 400,
              "height": 400,
              "formats": {
                "thumbnail": {
                  "name": "thumbnail",
                  "hash": "thumbnail_hash_marko",
                  "ext": "jpg",
                  "mime": "image/jpeg",
                  "width": 100,
                  "height": 100,
                  "size": 54321,
                  "url": "https://example.com/thumbnail_marko.jpg"
                }
              },
              "hash": "profile_image_hash_marko",
              "ext": "jpg",
              "mime": "image/jpeg",
              "size": 654321,
              "url": "https://example.com/profile_image_marko.jpg"
            }
          }
        },
        {
          "id": 2,
          "name": "Ana Anić",
          "slug": "ana-anic",
          "role": "Novinarka",
          "published_at": "2023-09-18T11:00:00Z",
          "created_at": "2023-09-18T11:00:00Z",
          "updated_at": "2023-09-18T11:00:00Z",
          "urls": {
            "id": 2,
            "twitter": "ana_anic",
            "instagram": "ana.anic",
            "facebook": "ana.anic",
            "linkedin": "ana-anic"
          },
          "featured": {
            "id": 2,
            "description": "Ana Anić - Novinarka",
            "profile_image": {
              "id": 2,
              "name": "Profile Image Ana",
              "alternativeText": "Profilna slika Ana",
              "caption": "Profilna slika za Anu Anić",
              "width": 400,
              "height": 400,
              "formats": {
                "thumbnail": {
                  "name": "thumbnail",
                  "hash": "thumbnail_hash_ana",
                  "ext": "jpg",
                  "mime": "image/jpeg",
                  "width": 100,
                  "height": 100,
                  "size": 54321,
                  "url": "https://example.com/thumbnail_ana.jpg"
                }
              },
              "hash": "profile_image_hash_ana",
              "ext": "jpg",
              "mime": "image/jpeg",
              "size": 765432,
              "url": "https://example.com/profile_image_ana.jpg"
            }
          }
        }
      ]
    
      
        export const pages = [
          {
            "id": 1,
            "title": "O nama",
            "slug": "o-nama",
            "description": "Opis stranice 'O nama'",
            "content": "Ovo je stranica koja govori o nama...",
            "published_at": "2023-09-16T14:00:00Z",
            "created_at": "2023-09-16T14:00:00Z",
            "updated_at": "2023-09-16T14:00:00Z",
            "cover": {
              "id": 1,
              "name": "Cover O nama",
              "alternativeText": "Cover slika za stranicu 'O nama'",
              "caption": "Slika za stranicu 'O nama'",
              "width": 800,
              "height": 600,
              "formats": {
                "thumbnail": {
                  "name": "thumbnail",
                  "hash": "thumbnail_hash_o_nama",
                  "ext": "jpg",
                  "mime": "image/jpeg",
                  "width": 200,
                  "height": 150,
                  "size": 12345,
                  "url": "https://example.com/thumbnail_o_nama.jpg"
                }
              },
              "hash": "cover_hash_o_nama",
              "ext": "jpg",
              "mime": "image/jpeg",
              "size": 654321,
              "url": "https://example.com/cover_o_nama.jpg"
            }
          },
          {
            "id": 2,
            "title": "Kontakt",
            "slug": "kontakt",
            "description": "Opis stranice 'Kontakt'",
            "content": "Ovo je stranica sa kontakt informacijama...",
            "published_at": "2023-09-17T15:00:00Z",
            "created_at": "2023-09-17T15:00:00Z",
            "updated_at": "2023-09-17T15:00:00Z",
            "cover": {
              "id": 2,
              "name": "Cover Kontakt",
              "alternativeText": "Cover slika za stranicu 'Kontakt'",
              "caption": "Slika za stranicu 'Kontakt'",
              "width": 1200,
              "height": 900,
              "formats": {
                "thumbnail": {
                  "name": "thumbnail",
                  "hash": "thumbnail_hash_kontakt",
                  "ext": "jpg",
                  "mime": "image/jpeg",
                  "width": 300,
                  "height": 225,
                  "size": 23456,
                  "url": "https://example.com/thumbnail_kontakt.jpg"
                }
              },
              "hash": "cover_hash_kontakt",
              "ext": "jpg",
              "mime": "image/jpeg",
              "size": 765432,
              "url": "https://example.com/cover_kontakt.jpg"
            }
          }
        ]
      
      
  
        
          export const users = [
            {
              "id": 1,
              "username": "john_doe",
              "email": "john@example.com",
              "full_name": "John Doe",
              "avatar": {
                "id": 1,
                "name": "Avatar John",
                "alternativeText": "Profilna slika John Doe",
                "caption": "Profilna slika za John Doe",
                "width": 200,
                "height": 200,
                "formats": {
                  "thumbnail": {
                    "name": "thumbnail",
                    "hash": "thumbnail_hash_john",
                    "ext": "jpg",
                    "mime": "image/jpeg",
                    "width": 50,
                    "height": 50,
                    "size": 12345,
                    "url": "https://example.com/thumbnail_john.jpg"
                  }
                },
                "hash": "avatar_hash_john",
                "ext": "jpg",
                "mime": "image/jpeg",
                "size": 654321,
                "url": "https://example.com/avatar_john.jpg"
              }
            },
            {
              "id": 2,
              "username": "jane_smith",
              "email": "jane@example.com",
              "full_name": "Jane Smith",
              "avatar": {
                "id": 2,
                "name": "Avatar Jane",
                "alternativeText": "Profilna slika Jane Smith",
                "caption": "Profilna slika za Jane Smith",
                "width": 200,
                "height": 200,
                "formats": {
                  "thumbnail": {
                    "name": "thumbnail",
                    "hash": "thumbnail_hash_jane",
                    "ext": "jpg",
                    "mime": "image/jpeg",
                    "width": 50,
                    "height": 50,
                    "size": 12345,
                    "url": "https://example.com/thumbnail_jane.jpg"
                  }
                },
                "hash": "avatar_hash_jane",
                "ext": "jpg",
                "mime": "image/jpeg",
                "size": 765432,
                "url": "https://example.com/avatar_jane.jpg"
              }
            }
          ]
        
        
    

  
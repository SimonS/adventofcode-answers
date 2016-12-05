(def directions (slurp "answers/inputs/day03.txt"))

(defn get-delivered-houses [position, destinations, instructions]
  (if (= (count instructions) 0)
    destinations
    (let [current-instruction (first instructions)
          new-position (case current-instruction
                         \> (update-in position [0] inc)
                         \< (update-in position [0] dec)
                         \^ (update-in position [1] inc)
                         \v (update-in position [1] dec))]
      (recur new-position
             (conj destinations new-position)
             (rest instructions)))))

(defn directions->houses
  "when given directions, returns set of house coordinates"
  [directions]
  (get-delivered-houses [0 0] #{[0 0]} directions))

;; Part 1

(count (directions->houses directions))

;; Part 2

(count (clojure.set/union
  (directions->houses (take-nth 2 directions))
  (directions->houses (take-nth 2 (rest directions)))))
